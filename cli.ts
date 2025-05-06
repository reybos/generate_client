#!/usr/bin/env node

import { getItemApiDocumentationTool } from "./src/tool/get-item-api-documentation";

(async () => {
  try {
    const result = await getItemApiDocumentationTool.handler({}, {});
    if (result && result.content && result.content[0] && result.content[0].text) {
      console.log(result.content[0].text);
    } else {
      console.error("No content returned from tool.");
    }
  } catch (error) {
    console.error("Error running CLI tool:", error);
  }
})(); 