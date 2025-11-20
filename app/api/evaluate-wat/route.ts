import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { watText, testCategory } = await request.json();

    if (!watText || !testCategory) {
      return NextResponse.json(
        { error: 'Missing required fields: watText and testCategory' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an English language evaluator for Indian graduates. Evaluate writing assessment tasks based on logic, structure, and language quality."
        },
        {
          role: "user",
          content: `Evaluate this WAT response based on:
a) Logic & Coherence
b) Structure of paragraph (Introduction, Body, Conclusion)
c) Grammar & Language quality

Provide evaluation in under 300 words.

Test Category: ${testCategory}
WAT Text: ${watText}`
        }
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    const evaluation = completion.choices[0]?.message?.content || 'Unable to generate evaluation';

    return NextResponse.json({
      success: true,
      evaluation
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timeout. Please try again.' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to evaluate WAT response. Please try again.' },
      { status: 500 }
    );
  }
}
