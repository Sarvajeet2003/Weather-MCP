export interface MCPTool {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  execute: (params: any) => Promise<any>;
}

export interface MCPToolResponse {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}