import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const streamCompletion = async (
  message: string,
  onChunk: (chunk: string) => void,
  onError?: (error: any) => void
) => {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    onError?.(new Error('API key is not configured'));
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful agricultural marketplace assistant. Provide concise and relevant information about farming, produce, and market trends.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
      stream: false // Changed to false for testing
    });

    const content = response.choices[0]?.message?.content;
    if (content) {
      onChunk(content);
    } else {
      onError?.(new Error('No response content received'));
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', {
      message: error.message,
      type: error.type,
      status: error.status
    });
    onError?.(error);
  }
};