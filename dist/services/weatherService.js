"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = getWeatherData;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // <-- This is the name your code uses
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
async function getWeatherData(city) {
    try {
        const response = await axios_1.default.get(BASE_URL, {
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                throw new Error(`City "${city}" not found`);
            }
            throw new Error(`Weather API error: ${error.response.data.message || 'Unknown error'}`);
        }
        throw new Error('Failed to fetch weather data');
    }
}
