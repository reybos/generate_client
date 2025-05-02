import { z } from "zod";

/**
 * Minimal interface for an MCP tool.
 */
export interface Tool {
  name: string;
  description: string;
  parameters: z.ZodTypeAny;
  handler: (params: any, extra: unknown) => Promise<{ content: any[] }>;
} 