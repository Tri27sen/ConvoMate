// app/api/gemini-suggestions/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI("AIzaSyCmB76EFfe0GOlEY5Yoklu3a9T9vFKveCM");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    // Create a safer prompt
    const saferPrompt = `Generate 5 friendly conversation starters or ice breakers that are casual and positive. 
    Examples could be asking about hobbies, favorite books, or travel experiences. 
    Keep responses professional and appropriate.
    Separate each message with ||. Keep each message between 20-50 characters.
    Example format: How's your day going?||What's your favorite hobby?`;

    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
    });

    // Generate content
    const result = await model.generateContent(saferPrompt);
    
    if (result.response.text) {
      const suggestions = result.response.text();
      console.log("we are doing a great job",result)
      console.log("Suggestions generated:", suggestions);
      return NextResponse.json({ suggestions });
    } else {
      // Fallback suggestions if generation fails
      const fallbackSuggestions = "How's your day going?||What's your favorite hobby?||What music do you enjoy?||Read any good books lately?||What's your dream vacation?";
      console.log("Using fallback suggestions");
      return NextResponse.json({ suggestions: fallbackSuggestions });
    }
    
  } catch (error) {
    console.error('Gemini API error:', error);
    // Return fallback suggestions in case of any error
    const fallbackSuggestions = "How's your day going?||What's your favorite hobby?||What music do you enjoy?||Read any good books lately?||What's your dream vacation?";
    return NextResponse.json({ suggestions: fallbackSuggestions });
  }
}