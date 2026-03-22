import { NextResponse } from 'next/server'

// Task AI-303: Secure Edge Proxy for Hugging Face Free API
// Enables stateless RAG generation without exposing keys or crushing client devices.

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { query, context } = await req.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is missing' }, { status: 400 })
    }

    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY
    if (!HF_TOKEN) {
      // Return a simulated response if running locally without keys (for PoC)
      return NextResponse.json({ 
        answer: `[Mocked Edge RAG] In the context of "${context?.substring(0, 30)}...", the answer to your query is that the fundamental truth is unity within consciousness.` 
      })
    }

    const prompt = `Based on the following Vedic verses:\n${context}\n\nAnswer the user's question: ${query}\n\nAnswer:`

    const rawResponse = await fetch(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      {
        headers: { 
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 150 } }),
      }
    )

    if (!rawResponse.ok) {
      return NextResponse.json({ error: 'Failed to generate response cluster' }, { status: 502 })
    }

    const data = await rawResponse.json()
    const generated_text = Array.isArray(data) ? data[0].generated_text : data.generated_text

    return NextResponse.json({ answer: generated_text })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Edge Error' }, { status: 500 })
  }
}
