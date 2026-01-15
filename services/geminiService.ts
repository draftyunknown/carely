
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const processCustomerMessage = async (
  profile: BusinessProfile,
  message: string,
  history: { role: string, content: string }[]
) => {
  const model = 'gemini-3-flash-preview';
  
  // STRICT Knowledge-Only System Instruction to prevent hallucinations
  const systemInstruction = `
    ROLE: You are the Official AI Agent for ${profile.name} (${profile.industry}).
    TONE: ${profile.personality}.
    KNOWLEDGE BASE:
    - Description: ${profile.description}
    - Services: ${profile.services.map(s => `${s.name} ($${s.price}, ${s.duration}min)`).join(', ')}
    - FAQs: ${profile.faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join('\n')}

    STRICT RULES:
    1. Only answer based on the provided KNOWLEDGE BASE. 
    2. If a query is outside this scope, politely explain you don't have that information and offer to escalate to a human.
    3. HALLUCINATION PREVENTION: Never invent prices, dates, or policies not listed above.
    4. INTENT DETECTION: Identify if the user wants 'info', 'booking', or 'escalation'.
    5. BOOKING: If the user wants to book, confirm the service name and ask for a preferred date/time if not provided.
    6. ESCALATION: If the user is angry, confused, or asks for a human, set 'needsHuman' to true.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: `System context: ${systemInstruction}` }] },
        // Memory Injection (limited to last 10 turns for token efficiency)
        ...history.slice(-10).map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.content }] 
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            intent: { type: Type.STRING, description: "info, booking, escalation, smalltalk" },
            confidence: { type: Type.NUMBER, description: "0.0 to 1.0" },
            needsHuman: { type: Type.BOOLEAN },
            suggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["reply", "intent", "confidence", "needsHuman"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // Confidence Threshold Check (Ultra-Elite Reliability)
    if (result.confidence < 0.7) {
      result.needsHuman = true;
      result.reply = "I'm checking that with our team to make sure I give you the most accurate information. One moment...";
    }

    return result;
  } catch (e) {
    console.error("AI Service Error:", e);
    // Graceful Degradation Fallback
    return { 
      reply: "I'm sorry, I'm having a bit of trouble connecting to my knowledge base. Let me get a human team member to help you right away.", 
      intent: "error_fallback", 
      confidence: 0, 
      needsHuman: true 
    };
  }
};
