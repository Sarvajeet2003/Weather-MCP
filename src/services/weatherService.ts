import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // <-- This is the name your code uses
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  country: string;
  feelsLike: number;
  pressure: number;
}

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use metric units (Celsius)
      }
    });

    const data = response.data;
    
    return {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      country: data.sys.country,
      feelsLike: data.main.feels_like,
      pressure: data.main.pressure
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      throw new Error(`Weather API error: ${error.response.data.message || 'Unknown error'}`);
    }
    throw new Error('Failed to fetch weather data');
  }
}