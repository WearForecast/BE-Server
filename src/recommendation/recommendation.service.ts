import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WeatherService } from 'src/weather/weather.service';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
import { firstValueFrom } from 'rxjs';
import { buildAIRequestPayload } from './payload/ai-request.payload';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RecommendationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly weatherService: WeatherService,
    private readonly httpService: HttpService,
  ) {
    this.testCacheConnection();
  }

  private generateCacheKey(gender: string, weatherData: any): string {
    const simplifiedWeather = {
      POP: weatherData.POP,
      PTY: weatherData.PTY,
      SKY: weatherData.SKY,
      TMN: weatherData.TMN,
      TMX: weatherData.TMX,
      WSD: weatherData.WSD,
      REH: weatherData.REH,
      T1H: Math.round(parseFloat(weatherData.T1H)),
    };

    return `recommendation:${gender}:${JSON.stringify(simplifiedWeather)}`;
  }

  private async testCacheConnection() {
    try {
      const testKey = 'test-connection';
      const testValue = 'test-' + Date.now();
      await this.cacheManager.set(testKey, testValue, 60);
      const result = await this.cacheManager.get(testKey);
      console.log('Cache connection test:', {
        success: result === testValue,
        expected: testValue,
        received: result,
      });
    } catch (error) {
      console.error('Cache connection test failed:', error);
    }
  }

  private stripTokenFromUrl(url: string): string {
    // Remove the token query parameter from the URL
    return url.split('?')[0];
  }

  async getRecommendation(
    user: any,
    forceNew: boolean = false,
  ): Promise<RecommendationResponseDto> {
    if (!user || !user.gender) {
      throw new HttpException(
        'User information is missing or incomplete',
        HttpStatus.BAD_REQUEST,
      );
    }

    const gender = (() => {
      if (user.gender === '남') {
        return 'men';
      } else if (user.gender === '여') {
        return 'women';
      } else {
        return 'neutral';
      }
    })();

    const weatherData = await this.weatherService.getWeatherByLocation(
      user.region,
    );

    const cacheKey = this.generateCacheKey(gender, weatherData);
    console.log('Generated cache key:', cacheKey);

    if (!forceNew) {
      try {
        console.log('Attempting to retrieve from cache with key:', cacheKey);
        const cached = await this.cacheManager.get<string>(cacheKey);
        console.log('Raw cached data:', cached);

        if (cached) {
          try {
            const parsedData = JSON.parse(cached);
            console.log('Parsed cached data:', parsedData);
            if (parsedData.images && parsedData.recommendation_summary) {
              return parsedData as RecommendationResponseDto;
            }
          } catch (parseError) {
            console.error('Error parsing cached data:', parseError);
          }
        }
        console.log('Cache miss or invalid data');
      } catch (error) {
        console.error('Cache retrieval error:', error);
      }
    } else {
      console.log('Force new recommendation');
    }

    const aiRequestPayload = buildAIRequestPayload(gender, weatherData);

    const baseUrl = process.env.AI_SERVER_URL;
    const trimmedBaseUrl = baseUrl.endsWith('/')
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const aiEndpoint = '/recommend';
    const aiServerUrl = `${trimmedBaseUrl}${aiEndpoint}`;

    const queryParams = new URLSearchParams();
    queryParams.append('gender', aiRequestPayload.gender);
    queryParams.append('weather', aiRequestPayload.weather);
    const urlWithQuery = `${aiServerUrl}?${queryParams.toString()}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(urlWithQuery),
      );
      const data = response.data;
      const recommendationResponse: RecommendationResponseDto = {
        images: data[0],
        recommendation_summary: data[1],
      };

      // Cache the response with explicit TTL
      try {
        const stringifiedData = JSON.stringify(recommendationResponse);
        console.log('Attempting to cache data with TTL 3600');

        // Explicitly set TTL in set operation
        await this.cacheManager.set(
          cacheKey,
          stringifiedData,
          3600 * 1000, // TTL in milliseconds
        );

        // Double verification
        const immediateVerification =
          await this.cacheManager.get<string>(cacheKey);
        console.log('Immediate cache verification:', {
          success: !!immediateVerification,
          matchesOriginal: immediateVerification === stringifiedData,
        });

        // Delayed verification
        setTimeout(async () => {
          const delayedVerification =
            await this.cacheManager.get<string>(cacheKey);
          console.log('Delayed cache verification (1s):', {
            success: !!delayedVerification,
            matchesOriginal: delayedVerification === stringifiedData,
          });
        }, 1000);
      } catch (cacheError) {
        console.error('Error caching data:', cacheError);
      }

      return recommendationResponse;
    } catch (error) {
      console.error('Error calling AI server:', error);
      throw new HttpException(
        'Failed to get recommendations from AI server',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
