
import { GoogleGenAI, Type } from "@google/genai";
import type { Answers, RecommendationResponse, XiaohongshuPost } from '../types';
import { translations } from '../translations';

// Safely access the API key to prevent a ReferenceError on load in browser environments.
// If the key is not provided by the environment, it defaults to an empty string.
// The API call will fail gracefully later, which is handled by the UI.
const API_KEY = (typeof process !== 'undefined' && process.env?.API_KEY) || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Reusable schema for a Xiaohongshu post
const xiaohongshuPostSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        body: { type: Type.STRING },
        tags: { type: Type.STRING }
    },
};

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    usage: { type: Type.STRING },
                },
                 required: ["productName", "reason", "usage"]
            }
        },
        summary: { type: Type.STRING },
        xiaohongshuPost: {
            ...xiaohongshuPostSchema,
            required: ["title", "body", "tags"]
        }
    },
    required: ["recommendations", "summary", "xiaohongshuPost"]
};


export const getRecommendation = async (answers: Answers, language: 'en' | 'zh'): Promise<RecommendationResponse> => {
    const t = translations[language];
    
    const userProfile = `
        - Main Goal: ${answers.mainGoal}
        - Preferred Form: ${answers.preference}
        - Lifestyle Factor: ${answers.lifestyle}
    `;

    const systemInstruction = `
        You are an expert AI health advisor for the '美甘莓露' & '畅晟' product series.
        Your task is to recommend 2 to 3 products from the provided product context based on the user's profile.
        All text in your response (summaries, reasons, etc.) MUST be in the requested language (${language === 'zh' ? 'Chinese' : 'English'}).
        Ensure your recommendations are highly relevant to the user's stated goals.
        Do not invent products or features not listed in the context below.

        You must also create a short, engaging social media post in the style of 'Little Red Book' (小红书). The post must have a catchy title, a body with plenty of relevant emojis and newlines for readability, and a few relevant hashtags. This post MUST also be in the requested language.

        You must provide the entire response as a JSON object that strictly adheres to the provided schema. Do not output any text or markdown formatting outside of the JSON object.

        --- PRODUCT CONTEXT ---
        ${t.productContext}
        --- END PRODUCT CONTEXT ---
    `;
    
    const userContent = `
        Please provide a recommendation for the following user profile.
        
        ## User Profile
        ${userProfile}
    `;

    try {
        if (!API_KEY) {
            throw new Error("API_KEY is not configured in the environment.");
        }
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userContent,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.6,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (!result.recommendations || !result.summary || !result.xiaohongshuPost) {
          throw new Error("Invalid response structure from API.");
        }

        return result as RecommendationResponse;

    } catch (error) {
        console.error("Error fetching recommendation from Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get recommendation: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while fetching the recommendation.");
    }
};

export const searchSavedPosts = async (query: string, savedPosts: XiaohongshuPost[], language: 'en' | 'zh'): Promise<XiaohongshuPost | null> => {
    const t = translations[language];

    const systemInstruction = `
        You are an intelligent search assistant. Your task is to find the single most relevant post from the provided list of JSON objects based on a user's query.
        The posts are social media content about health and wellness products.
        Analyze the user's query and the content of each post (title, body, tags) to find the best match.
        You must return ONLY the full JSON object of the single best matching post.
        If no post is a good match for the query, you must return an empty JSON object: {}.
        Your response must be in the requested language (${language === 'zh' ? 'Chinese' : 'English'}).
        The response must be a JSON object that strictly adheres to the provided schema. Do not output any text or markdown formatting outside of the JSON object.
    `;

    const userContent = `
        User Query: "${query}"

        --- AVAILABLE POSTS ---
        ${JSON.stringify(savedPosts, null, 2)}
        --- END AVAILABLE POSTS ---

        Find the most relevant post for the query above.
    `;

    try {
        if (!API_KEY) {
            throw new Error("API_KEY is not configured in the environment.");
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userContent,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: xiaohongshuPostSchema,
                temperature: 0.2,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        // If the result is an empty object, it means no match was found.
        if (Object.keys(result).length === 0) {
            return null;
        }

        // Basic validation
        if (!result.title || !result.body || !result.tags) {
            console.warn("Search result from API is missing required fields.", result);
            return null;
        }

        return result as XiaohongshuPost;

    } catch (error) {
        console.error("Error searching posts with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to search posts: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while searching posts.");
    }
};
