
import { GoogleGenAI } from "@google/genai";

export async function simulatePythonExecution(code: string): Promise<string> {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        throw new Error("API_KEY environment variable not set. Please ensure you have a valid API key configured.");
    }

    // Initialize the client per request to ensure we use the latest env and prevent top-level crashes
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `
You are a Python script execution simulator.
Your task is to simulate the execution of the following Python script on a Linux machine with multiple NVIDIA GPUs and generate a realistic console output.

Python Script:
---
${code}
---

Instructions for simulation:
1.  **Randomly choose one of the following two scenarios for your output:**
    *   **Scenario 1 (Success):** The \`nvidia-smi\` command succeeds. Simulate a system with 2 to 4 GPUs. Generate realistic but varied free memory values for each GPU (e.g., some high, some low, between 1000 MiB and 24000 MiB). The script should then identify and select the GPU with the most free memory and print all the corresponding success messages.
    *   **Scenario 2 (Failure):** The \`nvidia-smi\` command fails. This could be due to 'command not found' or a driver issue. The script should then print the warning message about the failure and falling back to the default device.

2.  **Output Format:**
    *   Your output MUST ONLY be the text that would be printed to the console during the script's execution.
    *   DO NOT add any extra explanations, introductory text, comments, or markdown formatting like \`\`\` or \`\`\`bash.
    *   The output should look exactly like it would in a real terminal.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        if (!response.text) {
          throw new Error("Received an empty response from the API.");
        }
        
        return response.text.trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Rethrow with a user-friendly message if possible, or just the error
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to communicate with the Gemini API. Please check your network connection.");
    }
}
