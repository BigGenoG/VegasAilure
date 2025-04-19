import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages,
    }),
  });

  const json = await res.json();
  const reply = json.choices?.[0]?.message?.content || 'Sorry, no response.';
  return NextResponse.json({ reply });
}
