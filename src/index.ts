import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import yaml from "js-yaml";

const NWS_API_BASE = "https://raw.githubusercontent.com/reybos/otus-highload-social-network-2024/refs/heads/master/main-service/test.yaml";
const USER_AGENT = "item-app/1.0";

// Create server instance
const server = new McpServer({
  name: "item-api",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function makeNWSRequest<T extends object>(url: string): Promise<T | null> {
    const headers = {
      "User-Agent": USER_AGENT,
      Accept: "text/plain",
    };
  
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const textContent = await response.text();
      try {
        const yamlContent = yaml.load(textContent) as T;
        return yamlContent;
      } catch (parseError) {
        console.error("Error parsing YAML content:", parseError);
        throw new Error("Failed to parse YAML content");
      }
    } catch (error) {
      console.error("Error making request:", error);
      return null;
    }
  }

server.tool(
    "get-item-api-documentation",
    "Get item api documentation",
    async (extra) => {
        try {
            const data = await makeNWSRequest<{ content: string }>(NWS_API_BASE);
            if (!data) {
                throw new Error("Failed to retrieve or parse item-api data");
            }
            return {
                content: [
                    {
                        type: "text",
                        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
                    },
                ],
            };
        } catch (error: unknown) {
            console.error("Error in get-item-api-documentation:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to retrieve item-api data: ${errorMessage}`,
                    },
                ],
            };
        }
    }
)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });