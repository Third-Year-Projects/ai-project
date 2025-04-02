import { streamCompletion } from './openai';

const testAPI = async () => {
  try {
    await streamCompletion(
      'Hello',
      (chunk) => console.log('Received chunk:', chunk),
      (error) => console.error('Error:', error)
    );
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testAPI();