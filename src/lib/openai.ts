export async function fetchOpenAIResponse(messages: { role: string; content: string }[]) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch OpenAI response');
    }
  
    const data = await response.json();
    return data.reply;
  }
  