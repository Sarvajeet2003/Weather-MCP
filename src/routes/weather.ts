import { Router, Request, Response, RequestHandler } from 'express';
import { getTool } from '../mcp/toolsRegistry';

const router = Router();

// Get weather data for a city
const getWeatherHandler: RequestHandler = async (req, res) => {
  try {
    const { city } = req.body;
    
    if (!city) {
      res.status(400).json({ error: 'City parameter is required' });
      return;
    }
    
    const weatherTool = getTool('getWeather');
    
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
  } catch (error) {
    console.error('Error in getWeather endpoint:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
};

// Get available tools
const getToolsHandler: RequestHandler = (req, res) => {
  const weatherTool = getTool('getWeather');
  
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

export { router as weatherRouter };