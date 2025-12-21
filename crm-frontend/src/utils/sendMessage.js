/**
 * Send a message to OpenRouter API and get a response
 * Uses DeepSeek R1 model via OpenRouter
 */
export async function sendMessage(text) {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = import.meta.env.VITE_OPENROUTER_MODEL || 'deepseek/deepseek-r1';
    const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';

    if (!apiKey) {
      throw new Error('API key is not configured. Please check your .env file.');
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'NEXORA CRM Chatbot'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are NEXBOT, a helpful AI assistant for NEXORA CRM. You help users with questions about the CRM, customer management, campaigns, analytics, and general business inquiries. Be friendly, professional, and concise in your responses.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.error?.message || `API Error: ${response.status}`;
      console.error('API Error Details:', errorData);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response from AI service');
    }
    
    const assistantMessage = data.choices[0].message.content;

    return {
      text: assistantMessage
    };
  } catch (error) {
    console.error('Chatbot Error:', error);
    const errorMsg = error.message || 'Failed to connect to AI service';
    throw new Error(errorMsg);
  }
}
