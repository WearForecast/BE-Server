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
    private readonly weatherService: WeatherService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

    // Convert Gender to English
    const gender = (() => {
      if (user.gender === '남') {
        return 'men';
      } else if (user.gender === '여') {
        return 'women';
      } else {
        return 'neutral';
      }
    })(); 
    console.log(gender);

    // Get weather data by user's location
    const weatherData = await this.weatherService.getWeatherByLocation(
      user.region,
    );

    const cacheKey = `recommendation:${gender}:${JSON.stringify(weatherData)}`;
    console.log('Cache key:', cacheKey);

    if (!forceNew) {
      const cached =
        await this.cacheManager.get<RecommendationResponseDto>(cacheKey);
      if (cached) {
        console.log('Returning cached recommendation');
        return cached;
      }
      console.log('No Cache found');
    } else {
      console.log('Force new recommendation');
    }

    // Build the payload (e.g., { gender: "Male", weather: "POP: 20, ..." })
    const aiRequestPayload = buildAIRequestPayload(gender, weatherData);

    // Build the full AI server URL
    const baseUrl = process.env.AI_SERVER_URL;
    const trimmedBaseUrl = baseUrl.endsWith('/')
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const aiEndpoint = '/recommend';
    const aiServerUrl = `${trimmedBaseUrl}${aiEndpoint}`;

    // Convert payload to query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('gender', aiRequestPayload.gender);
    queryParams.append('weather', aiRequestPayload.weather);
    const urlWithQuery = `${aiServerUrl}?${queryParams.toString()}`;

    try {
      // Send a POST request to the URL that now contains query parameters.
      // Since all data is in the query string, no request body is needed.
      const response = await firstValueFrom(
        this.httpService.post(urlWithQuery),
      );
      const data = response.data;
      const recommendationResponse: RecommendationResponseDto = {
        images: data[0],
        recommendation_summary: data[1],
      };

      await this.cacheManager.set(cacheKey, recommendationResponse, 0);

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
