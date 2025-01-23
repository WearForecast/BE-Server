import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class WeatherService {
  private readonly forecastApiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  private readonly currentApiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

  private readonly targetCategories = ['POP', 'PTY', 'SKY', 'TMN', 'TMX', 'WSD', 'REH'];

  // 1. 동네예보 API 호출
  private async getForecastData(baseDate: string, baseTime: string, nx: number, ny: number) {
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
    return this.targetCategories.reduce((acc, category) => {
      const item = items.find((i) => i.category === category);
      acc[category] = item ? item.fcstValue : null; // 값이 없으면 null
      return acc;
    }, {});
  }

  // 2. 초단기실황 API 호출
  private async getCurrentTemperature(baseDate: string, baseTime: string, nx: number, ny: number) {
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
    const temperatureData = items.find((i) => i.category === 'T1H'); // 기온 데이터만 추출
    return temperatureData ? temperatureData.obsrValue : null; // 없으면 null
  }

  // 3. 통합 데이터 반환
  async getWeather(baseDate: string, baseTime: string, nx: number, ny: number) {
    try {
      const [forecastData, temperature] = await Promise.all([
        this.getForecastData(baseDate, baseTime, nx, ny),
        this.getCurrentTemperature(baseDate, baseTime, nx, ny),
      ]);

      // 초단기 실황 데이터(T1H)를 추가
      return {
        ...forecastData,
        T1H: temperature,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error.response?.data || error.message);
      throw new Error('Failed to fetch weather data');
    }
  }
}