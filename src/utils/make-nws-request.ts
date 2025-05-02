import yaml from "js-yaml";

const USER_AGENT = "item-app/1.0";

/**
 * Makes a request to the given URL and parses the YAML response.
 * @param url - The URL to fetch
 * @returns Parsed YAML content as an object, or null on error
 */
export async function makeNWSRequest<T extends object>(url: string): Promise<T | null> {
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