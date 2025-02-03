import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { LocationService } from './location/location.service';

const SKY_MAP: Record<string, string> = {
  '1': 'clear',
  '3': 'partly cloudy',
  '4': 'cloudy',
};

const PTY_MAP: Record<string, string> = {
  '0': 'none',
  '1': 'rain',
  '2': 'rain/snow',
  '3': 'snow',
  '4': 'rain shower',
};

@Injectable()
export class WeatherService {
  constructor(private readonly locationService: LocationService) {}

  // 단기예보, 초단기실황
  private readonly forecastApiUrl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  private readonly currentApiUrl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

  private readonly targetCategories = [
    'POP',
    'PTY',
    'SKY',
    'TMN',
    'TMX',
    'WSD',
    'REH',
  ];

  // Calculate baseDate and baseTime dynamically (단기예보 조회시 기준 날짜와 시간 계산)
  private calculateBaseTime(): { baseDate: string; baseTime: string } {
    const now = new Date();
    const availableTimes = [2, 5, 8, 11, 14, 17, 20, 23];
    let closestHour = availableTimes[0];

    for (const hour of availableTimes) {
      if (now.getHours() >= hour) {
        closestHour = hour;
      } else {
        break;
      }
    }

    let baseDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate(),
    ).padStart(2, '0')}`;
    if (now.getHours() < closestHour) {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      baseDate = `${yesterday.getFullYear()}${String(
        yesterday.getMonth() + 1,
      ).padStart(2, '0')}${String(yesterday.getDate()).padStart(2, '0')}`;
    }

    const baseTime = String(closestHour).padStart(2, '0') + '00';
    return { baseDate, baseTime };
  }

  // Fetch forecast data 단기예보
  private async getForecastData(nx: number, ny: number) {
    const { baseDate, baseTime } = this.calculateBaseTime();
    const queryParams = qs.stringify({
      serviceKey: process.env.KMA_API_KEY,
      pageNo: 1,
      numOfRows: 1000,
      dataType: 'JSON',
      base_date: baseDate,
      base_time: baseTime,
      nx,
      ny,
    });

    const response = await axios.get(`${this.forecastApiUrl}?${queryParams}`);
    const items = response.data.response.body?.items?.item || [];
    return this.targetCategories.reduce(
      (acc, category) => {
        const item = items.find((i) => i.category === category);
        acc[category] = item ? item.fcstValue : null; // 값이 없으면 null
        return acc;
      },
      {} as Record<string, string | null>,
    );
  }

  // Fetch current temperature (T1H) 초단기실황
  private async getCurrentTemperature(nx: number, ny: number) {
    const { baseDate, baseTime } = this.calculateBaseTime();
    const queryParams = qs.stringify({
      serviceKey: process.env.KMA_API_KEY,
      pageNo: 1,
      numOfRows: 10,
      dataType: 'JSON',
      base_date: baseDate,
      base_time: baseTime,
      nx,
      ny,
    });

    const response = await axios.get(`${this.currentApiUrl}?${queryParams}`);
    const items = response.data.response.body?.items?.item || [];
    const temperatureData = items.find((i) => i.category === 'T1H');
    return temperatureData ? temperatureData.obsrValue : null;
  }

  // Helper to map numeric code to English text
  private mapWeatherCodes(forecastData: Record<string, string | null>) {
    // Copy original object
    const mapped = { ...forecastData };

    // Map SKY
    if (mapped.SKY !== null) {
      mapped.SKY = SKY_MAP[mapped.SKY] || 'unknown';
    }

    // Map PTY
    if (mapped.PTY !== null) {
      mapped.PTY = PTY_MAP[mapped.PTY] || 'unknown';
    }

    return mapped;
  }

  // Fetch combined weather data by location
  async getWeatherByLocation(region: string) {
    try {
      // Get nx, ny from the location service
      const { nx, ny } = await this.locationService.getGridFromRegion(region);

      // Fetch forecast and temperature data
      const [forecastData, temperature] = await Promise.all([
        this.getForecastData(nx, ny),
        this.getCurrentTemperature(nx, ny),
      ]);

      // Map numeric codes to English words (SKY, PTY)
      const mappedForecastData = this.mapWeatherCodes(forecastData);

      return {
        ...mappedForecastData,
        T1H: temperature,
      };
    } catch (error) {
      console.error(
        'Error fetching weather data:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch weather data');
    }
  }
}
