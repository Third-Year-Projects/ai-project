import React, { useState } from 'react';
import { streamCompletion } from '../utils/openai';

const TestChat: React.FC = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const testAPI = async () => {
    setError('');
    setResponse('Testing API...');
    
    try {
      await streamCompletion(
        'Tell me about organic farming',
        (content) => {
          setResponse(content);
        },
        (err) => {
          setError(err.message);
        }
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testAPI}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Test OpenAI API
      </button>
      {response && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TestChat;