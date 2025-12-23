import { GoogleGenAI } from "@google/genai";
import { HealthRecord, User } from "../types";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real app, ensure API_KEY is set. For this demo, we handle missing keys gracefully in UI.

let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const analyzeHealthRecord = async (record: HealthRecord): Promise<string> => {
  if (!ai) return "AI Service not configured (Missing API Key).";

  try {
    const prompt = `
      You are a helpful medical assistant. Analyze the following health record and provide a simple, 
      easy-to-understand summary for the patient. Explain any medical terms.
      
      Record Title: ${record.title}
      Type: ${record.type}
      Doctor Details: ${record.details}
      Summary: ${record.summary}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Error analyzing record:", error);
    return "Sorry, I encountered an error while analyzing this record.";
  }
};

export const chatWithHealthAssistant = async (
  history: {role: string, text: string}[], 
  userMessage: string,
  userContext: string,
  enableThinking: boolean = false
): Promise<string> => {
  if (!ai) return "AI Service not configured.";

  try {
    const modelName = enableThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    const thinkingConfig = enableThinking ? { thinkingBudget: 2048 } : undefined;

    // Create a new chat session for each request to allow dynamic config changes (like toggling thinking mode)
    // In a production app, you might manage persistent sessions differently.
    const chat = ai.chats.create({
      model: modelName,
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: `You are MediLink AI, a supportive digital health assistant. 
        Context about the user: ${userContext}
        
        Your Goal: Help users understand their symptoms, guide them to appropriate specialists, manage their prescriptions, and explain medical procedures. 
        Remember previous details in the conversation.
        If the user asks to book an appointment, guide them to the 'Doctors' section.
        Disclaimer: Always advise them to see a real doctor for emergencies.`,
        thinkingConfig: thinkingConfig
      }
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};