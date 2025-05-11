import { MCPTool } from './types';
import { getWeatherTool } from './tools/getWeatherTool';

// Register all available tools
const tools: MCPTool[] = [
  getWeatherTool
];

// Map for quick lookup by name
const toolsMap = new Map<string, MCPTool>();

// Initialize the map
tools.forEach(tool => {
  toolsMap.set(tool.name, tool);
});

export function getTool(name: string): MCPTool | undefined {
  return toolsMap.get(name);
}

export function getAllTools(): MCPTool[] {
  return tools;
}