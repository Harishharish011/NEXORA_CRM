// Stub function for sending messages - replace with actual API call
export async function sendMessage(text) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 400));

  // Fake response - replace with real API response
  return {
    text: `Demo reply to: "${text}". This is a placeholder response. Replace this with your LLM API integration.`
  };
}
