import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const gemini = {
  async generateStudyPlan(subject: string, hours: number, prepLevel: number) {
    const prompt = `You are an expert academic survival assistant for a platform called NIGHTBEFORE. 
    A student has an exam for "${subject}" in ${hours} hours. Their current preparation level is ${prepLevel}%.
    Generate a high-impact, realistic survival study plan for the remaining time.
    Focus on the most important topics, PYQ (Previous Year Questions) strategy, and mental survival tips.
    Format the response as a JSON object with the following structure:
    {
      "probability": number (0-100),
      "strategy": string (short overview),
      "milestones": [{ "time": string, "task": string, "priority": "Low" | "Medium" | "High" | "Critical" }],
      "warnings": [string]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      return null;
    }
  },

  async askDoubt(question: string, fileData?: { data: string; mimeType: string }) {
    const prompt = `You are a helpful, concise AI study assistant. Explain the following doubt or analyze the attached document: "${question}". Keep it simple, use bullet points, and highlight things likely to be asked in exams. If a document is provided, identify key formulas, definitions, and generate 5 flashcard-style Q&As.`;
    
    const parts: any[] = [{ text: prompt }];
    if (fileData) {
      parts.push({
        inlineData: {
          data: fileData.data.split(',')[1] || fileData.data,
          mimeType: fileData.mimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts }
    });

    return response.text;
  },

  async generateVivaQuestions(subject: string) {
    const prompt = `Generate 5 common viva/oral exam questions for the subject "${subject}" with brief, high-scoring answers.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              answer: { type: "string" }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  }
};
