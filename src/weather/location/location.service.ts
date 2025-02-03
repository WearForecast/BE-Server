import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationService {
  // Geocoding API base URL (Google Maps API)
  private readonly geocodeApiUrl =
    'https://maps.googleapis.com/maps/api/geocode/json';

  // Convert latitude/longitude to nx/ny
  private latLonToGrid(lat: number, lon: number): { nx: number; ny: number } {
    const RE = 6371.00877; // Earth radius (km)
    const GRID = 5.0; // Grid spacing (km)
    const SLAT1 = 30.0; // Projection latitude 1 (degrees)
    const SLAT2 = 60.0; // Projection latitude 2 (degrees)
    const OLON = 126.0; // Origin longitude (degrees)
    const OLAT = 38.0; // Origin latitude (degrees)
    const XO = 43; // Origin X coordinate (GRID)
    const YO = 136; // Origin Y coordinate (GRID)

    const DEGRAD = Math.PI / 180.0;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);

    const sfn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    const sfo = (Math.pow(sf, sfn) * Math.cos(slat1)) / sfn;
    const rro = (re * sfo) / Math.pow(ro, sfn);

    const rlat = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    const rra = (re * sfo) / Math.pow(rlat, sfn);
    const theta = lon * DEGRAD - olon;

    const rx = rra * Math.sin(theta * sfn) + XO;
    const ry = rro - rra * Math.cos(theta * sfn) + YO;

    return { nx: Math.round(rx), ny: Math.round(ry) };
  }

  // Geocoding function
  async getGridFromRegion(region: string): Promise<{ nx: number; ny: number }> {
    try {
      // Replace with your Google Maps API key
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const response = await axios.get(this.geocodeApiUrl, {
        params: {
          address: region,
          key: apiKey,
        },
      });

      const location = response.data.results[0]?.geometry?.location;
      if (!location) {
        throw new Error('Failed to find location');
      }

      const { lat, lng } = location;
      return this.latLonToGrid(lat, lng);
    } catch (error) {
      console.error('Error fetching location data:', error.message);
      throw new Error('Failed to calculate nx and ny');
    }
  }
}
