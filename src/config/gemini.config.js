// Gemini API Configuration Setup
// Instructions for configuring Google Gemini API integration

/*
SETUP INSTRUCTIONS:

1. Get your Google Gemini API key:
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Copy the key (should start with "AIza")

2. Create a .env file in your project root:
   - Copy .env.example to .env
   - Add your API key:
     VITE_GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz

3. Restart your development server after adding the API key

SECURITY NOTES:
- Never commit your .env file to version control
- Add .env to your .gitignore file
- Keep your API key secure and private
- Consider using different keys for development and production

TROUBLESHOOTING:
- If you get "API key not set" error: Check your .env file
- If you get 403 errors: Verify your API key permissions
- If you get 429 errors: You're hitting rate limits, wait before retrying
- If you get network errors: Check your internet connection

RATE LIMITS:
- Free tier: 15 requests per minute, 1,500 requests per day
- Paid tier: Higher limits based on your billing plan
*/

// Validate API key format
export const isValidAPIKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') return false;
  // Gemini API keys start with "AIza" and are typically 39 characters
  return apiKey.startsWith('AIza') && apiKey.length >= 35 && apiKey.length <= 45;
};

// Check if API key is configured
export const isAPIKeyConfigured = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return isValidAPIKey(apiKey);
};

// Get configuration status
export const getConfigurationStatus = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      configured: false,
      status: 'missing',
      message: 'VITE_GEMINI_API_KEY environment variable is not set'
    };
  }
  
  if (!isValidAPIKey(apiKey)) {
    return {
      configured: false,
      status: 'invalid',
      message: 'API key format is invalid. Should start with "AIza" and be 35-45 characters long'
    };
  }
  
  return {
    configured: true,
    status: 'valid',
    message: 'Gemini API key is properly configured'
  };
};

// Configuration constants
export const GEMINI_CONFIG = {
  MODEL: 'gemini-2.0-flash-latest',
  ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/',
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.3,
  TOP_K: 40,
  TOP_P: 0.95,
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000 // 1 second
};

export default {
  isValidAPIKey,
  isAPIKeyConfigured,
  getConfigurationStatus,
  GEMINI_CONFIG
}; 