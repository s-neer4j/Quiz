import { GoogleGenAI, Type } from "@google/genai";
import { Language, Level, Question } from '../types';

export const generateQuizQuestions = async (language: Language, level: Level): Promise<Question[]> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const schema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    text: { 
                        type: Type.STRING,
                        description: "The quiz question text. Should be a clear and concise question."
                    },
                    options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "An array of 4 distinct possible answers."
                    },
                    correctAnswer: { 
                        type: Type.STRING,
                        description: "The correct answer, which must exactly match one of the items in the 'options' array."
                    },
                },
                required: ['text', 'options', 'correctAnswer'],
            },
        };

        const prompt = `Generate ${level.quizLength} unique, high-quality, and logical quiz questions for a ${language.name} language test at the "${level.name}" (${level.difficulty}) level. The questions should be varied and test grammar, vocabulary, or comprehension. For each question, provide 4 distinct options. One of the options must be unambiguously the correct answer. The 'correctAnswer' value must exactly match one of the strings in the 'options' array. Do not generate questions that require an image.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const generatedQuestions = JSON.parse(response.text);

        if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
            let questions = generatedQuestions.map((q, index) => ({
                id: index + 1,
                text: q.text,
                options: q.options,
                correctAnswer: q.options.includes(q.correctAnswer) ? q.correctAnswer : q.options[0],
            }));
             // Ensure we have the exact number of questions requested
            if (questions.length > level.quizLength) {
                questions = questions.slice(0, level.quizLength);
            } else if (questions.length < level.quizLength) {
                console.warn(`AI generated ${questions.length} questions, expected ${level.quizLength}. Falling back.`);
                throw new Error("AI did not generate enough questions.");
            }
            return questions;
        } else {
            throw new Error("AI did not return a valid array of questions.");
        }

    } catch (error) {
        console.error("Failed to generate questions with AI, falling back to static data.", error);
        // Fallback to static data on error
        const shuffled = [...level.questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, level.quizLength);
    }
};
