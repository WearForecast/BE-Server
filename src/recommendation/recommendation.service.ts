import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WeatherService } from 'src/weather/weather.service';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
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

    // Get weather data by user's location
    const weatherData = await this.weatherService.getWeatherByLocation(
      user.region,
    );

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
