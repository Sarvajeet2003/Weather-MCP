"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTool = getTool;
exports.getAllTools = getAllTools;
const getWeatherTool_1 = require("./tools/getWeatherTool");
// Register all available tools
const tools = [
    getWeatherTool_1.getWeatherTool
];
// Map for quick lookup by name
const toolsMap = new Map();
// Initialize the map
tools.forEach(tool => {
    toolsMap.set(tool.name, tool);
});
function getTool(name) {
    return toolsMap.get(name);
}
function getAllTools() {
    return tools;
}
