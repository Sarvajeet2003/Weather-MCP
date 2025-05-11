"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherTool = void 0;
const weatherService_1 = require("../../services/weatherService");
exports.getWeatherTool = {
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
    async execute(params) {
        try {
            const weatherData = await (0, weatherService_1.getWeatherData)(params.city);
            return {
                status: 'success',
                data: weatherData
            };
        }
        catch (error) {
            return {
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
};
