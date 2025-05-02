import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Options for initializing MyServer.
 */
export interface MyServerOptions {
  [key: string]: unknown;
  /** The server name. */
  name: string;
  /** The server version. */
  version: string;
  /** The server capabilities. */
  capabilities: {
    resources: object;
    tools: object;
  };
}

/**
 * MyServer is a custom server that extends the base McpServer.
 *
 * @remarks
 * You can add custom logic or override methods here as needed for your application.
 */
export class MyServer extends McpServer {
  /**
   * Creates an instance of MyServer.
   *
   * @param options - The options to initialize the server.
   */
  constructor(options: MyServerOptions) {
    super(options);
  }
} 