export async function explainTopic(topic: string): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
    },
    body: JSON.stringify({
      model: 'google/gemma-3-4b-it:free',
      messages: [
        {
          role: 'user',
          content: `Explain the topic "${topic}" in simple, clear terms suitable for a student. Keep it 80-150 words, friendly tone, no markdown formatting, just plain text.`
        }
      ]
    })
  })

  const data = await response.json()
  console.log('OpenRouter response:', JSON.stringify(data))

  if (!data.choices || data.choices.length === 0) {
    throw new Error(data.error?.message || 'No response from AI')
  }

  return data.choices[0].message.content
}