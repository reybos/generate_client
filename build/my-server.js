import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
    constructor(options) {
        super(options);
    }
}
