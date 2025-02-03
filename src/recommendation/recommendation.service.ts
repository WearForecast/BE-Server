import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WeatherService } from 'src/weather/weather.service';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
import { AIRequestDto } from './dto/AI-request.dto';
import { firstValueFrom } from 'rxjs';
import { buildAIRequestPayload } from './payload/ai-request.payload';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly httpService: HttpService,
  ) {}

  async getRecommendation(user: any): Promise<RecommendationResponseDto> {
    if (!user || !user.gender) {
      throw new HttpException(
        'User information is missing or incomplete',
        HttpStatus.BAD_REQUEST,
      );
    }
    const gender = user.gender;

    const weatherData = await this.weatherService.getWeatherByLocation(
      user.region,
    );

    const aiRequestPayLoad = buildAIRequestPayload(gender, weatherData);

    // const aiServerUrl = process.env.AI_SERVER_URL;

    // Build the full AI server URL
    const baseUrl = process.env.AI_SERVER_URL;
    // Remove trailing slash if present
    const trimmedBaseUrl = baseUrl.endsWith('/')
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const aiEndpoint = '/recommend';
    const aiServerUrl = `${trimmedBaseUrl}${aiEndpoint}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(aiServerUrl, aiRequestPayLoad),
      );
      // Expected AI server response format: [ [imageUrl1, imageUrl2, ...], "Recommendation text" ]
      const data = response.data;
      const recommendationResponse: RecommendationResponseDto = {
        images: data[0],
        recommendation_summary: data[1],
      };

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
