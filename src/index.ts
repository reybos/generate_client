#!/usr/bin/env node
import { MyServer, type MyServerOptions } from "./my-server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { tools } from "./tool/index.js";
// Create server instance
const server = new MyServer({
  name: "item-api",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
} satisfies MyServerOptions);

// List of all tools
// const tools = [getItemApiDocumentationTool, getItemApiDocumentationToolNew];

tools.forEach(tool => {
  server.tool(
    tool.name,
    tool.description,
    async (extra) => {
      // MCP convention: tool arguments are under 'arguments'
      const params = tool.parameters.parse((extra as any)?.arguments ?? {});
      return tool.handler(params, extra);
    }
  );
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
  
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});