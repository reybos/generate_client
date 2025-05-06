/**
 * @module get-item-api-documentation
 * @description Tool for retrieving item API documentation from a remote YAML file.
 */
import { z } from "zod";
import { makeNWSRequest } from "../utils/make-nws-request.js";
/**
 * Tool: get-item-api-documentation
 * Get item api documentation from the remote YAML file.
 */
export const getItemApiDocumentationTool = {
    name: "get-item-api-documentation",
    description: "Get item api documentation",
    parameters: z.object({}),
    /**
     * Handler for the get-item-api-documentation tool.
     * @param params - Tool parameters (none for this tool)
     * @param extra - Extra context or arguments (if any)
     * @returns Tool result content
     */
    handler: async (_params, _extra) => {
        try {
            const NWS_API_BASE = "https://raw.githubusercontent.com/reybos/otus-highload-social-network-2024/refs/heads/master/main-service/test.yaml";
            const data = await makeNWSRequest(NWS_API_BASE);
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
        }
        catch (error) {
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
};
