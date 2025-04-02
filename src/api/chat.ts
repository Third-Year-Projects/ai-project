const API_KEY = 'AIzaSyDQaomteVOLSO0mxf0KrCLtN5QfLIJ_2T4';

export const chatWithAI = async (message: string) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      })
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log('Raw API Response:', data);

    if (data.error) {
      console.error('API Error:', data.error);
      throw new Error(data.error.message || 'API Error');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Chat Error:', error);
    throw error;
  }
};