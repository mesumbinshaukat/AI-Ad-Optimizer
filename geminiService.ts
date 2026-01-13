
import { GoogleGenAI, Type } from "@google/genai";
import { CampaignData, GenerationResult } from "./types";

export const generateAdCopy = async (data: CampaignData): Promise<GenerationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    Perform an exhaustive market intelligence search and generate 3 conversion-focused ad options.
    
    CRITICAL INSTRUCTION FOR COPYWRITING (HUMAN-ONLY STYLE):
    - Do NOT use em-dashes (—). Use periods, commas, or line breaks.
    - Do NOT use typical AI "hype" words like: Unlock, Unleash, Discover, Elevate, Transform, Revolutionize, Comprehensive, Dynamic.
    - Use a raw, genuine, human voice. Write like a high-performing marketer who knows the customer's pain points personally. 
    - Keep sentences varied in length. Use conversational transitions.
    - Each ad option MUST revolve around a single 'Focus Keyword' or psychological trigger.

    LOCAL RESEARCH TASK:
    - Search for high-intent areas in ${data.city}, ${data.country} relevant to ${data.targetAudience}.
    - Find specific neighborhoods, sub-sectors, and posh or commercial hubs (e.g., if Karachi, search for specific phases in DHA, specific blocks in North Nazimabad, etc.).
    - DIVIDE AREAS INTO TIERS:
      1. High Potential: Core commercial hubs or high-income residential areas where conversion is highest.
      2. Medium Potential: Emerging neighborhoods or business districts with moderate competition.
      3. Low Potential: Broader reaching areas for brand awareness or budget-friendly targeting.
    - provide as many specific areas as possible (at least 10-12 distinct areas/neighborhoods).
    - Identify actual local competitors currently operating in ${data.city} for "${data.productDescription}". Analyze their visible hook or selling point.

    CAMPAIGN PARAMETERS:
    Business: ${data.businessName}
    Product: ${data.productDescription}
    Audience: ${data.targetAudience}
    Platform: ${data.platform}
    Location: ${data.city}, ${data.country}
    Goal: ${data.goal}
    Tone: ${data.tone}
    USPs: ${data.uniqueSellingPoints}
    CTA: ${data.callToAction}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategySummary: { type: Type.STRING },
          marketResearch: {
            type: Type.OBJECT,
            properties: {
              localAreas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Neighborhood, town, or area name" },
                    reason: { type: Type.STRING, description: "Strategic reason for targeting this specific block or area" },
                    potential: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                  },
                  required: ["name", "reason", "potential"]
                }
              },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    strategy: { type: Type.STRING, description: "Observed marketing hook or perceived strategy" }
                  }
                }
              },
              audienceTargeting: {
                type: Type.OBJECT,
                properties: {
                  interests: { type: Type.ARRAY, items: { type: Type.STRING } },
                  demographics: { type: Type.STRING, description: "Age range, gender, and behavioral status" }
                }
              }
            }
          },
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                focusKeyword: { type: Type.STRING, description: "The single specific keyword/hook this option is built around" },
                headline: { type: Type.STRING },
                primaryText: { type: Type.STRING },
                description: { type: Type.STRING },
                ctaText: { type: Type.STRING },
                reasoning: { type: Type.STRING },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["id", "focusKeyword", "headline", "primaryText", "description", "ctaText", "reasoning", "keywords"]
            }
          }
        }
      },
      thinkingConfig: { thinkingBudget: 15000 }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Local research failed. The AI returned an empty response.");
  }

  try {
    return JSON.parse(text) as GenerationResult;
  } catch (error) {
    console.error("Failed to parse AI response", error);
    throw new Error("Research results were not in the expected format. Please try again.");
  }
};
