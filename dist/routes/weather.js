"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRouter = void 0;
const express_1 = require("express");
const toolsRegistry_1 = require("../mcp/toolsRegistry");
const router = (0, express_1.Router)();
exports.weatherRouter = router;
// Get weather data for a city
const getWeatherHandler = async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) {
            res.status(400).json({ error: 'City parameter is required' });
            return;
        }
        const weatherTool = (0, toolsRegistry_1.getTool)('getWeather');
        if (!weatherTool) {
            res.status(500).json({ error: 'Weather tool not available' });
            return;
        }
        const result = await weatherTool.execute({ city });
        if (result.status === 'error') {
            res.status(400).json({ error: result.error });
            return;
        }
        res.status(200).json(result.data);
    }
    catch (error) {
        console.error('Error in getWeather endpoint:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
};
// Get available tools
const getToolsHandler = (req, res) => {
    const weatherTool = (0, toolsRegistry_1.getTool)('getWeather');
    if (!weatherTool) {
        res.status(500).json({ error: 'Weather tool not available' });
        return;
    }
    // Return tool metadata without the execute function
    const { execute, ...toolMetadata } = weatherTool;
    res.status(200).json([toolMetadata]);
};
// Register routes
router.post('/getWeather', getWeatherHandler);
router.get('/tools', getToolsHandler);
