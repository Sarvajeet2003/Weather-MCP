import { MCPTool, MCPToolResponse } from '../types';
import { getWeatherData } from '../../services/weatherService';

export const getWeatherTool: MCPTool = {
  name: 'getWeather',
  description: 'Fetches real-time weather data for a given city using OpenWeatherMap API',
  parameters: {
    type: 'object',
    properties: {
      city: {
        type: 'string',
        description: 'The name of the city to get weather data for'
      }
    },
    required: ['city']
  },
  
  async execute(params: { city: string }): Promise<MCPToolResponse> {
    try {
      const weatherData = await getWeatherData(params.city);
      
      return {
        status: 'success',
        data: weatherData
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
};