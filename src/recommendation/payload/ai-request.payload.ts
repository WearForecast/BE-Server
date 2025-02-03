import { AIRequestDto } from '../dto/ai-request.dto';

function formatWeather(weather: any): string {
  // Customize this function to create a natural language summary of the weather.
  return `POP: ${weather.POP}, PTY: ${weather.PTY}, SKY: ${weather.SKY}, TMN: ${weather.TMN}°C, TMX: ${weather.TMX}°C, WSD: ${weather.WSD}m/s, REH: ${weather.REH}%, T1H: ${weather.T1H}°C`;
}

export function buildAIRequestPayload(
  gender: string,
  weather: any,
): AIRequestDto {
  return {
    gender,
    // Convert the weather object into a string, as FastAPI(AI server) expects a string.
    weather: formatWeather(weather),
  };
}
