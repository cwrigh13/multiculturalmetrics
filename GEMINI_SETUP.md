# Google Gemini AI Integration Setup Guide

This dashboard includes an AI assistant powered by Google Gemini (gemini-2.0-flash) that can analyze your multicultural metrics data and provide insights about SLNSW benchmark compliance.

## 🚀 Quick Setup

### 1. Get Your API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (starts with "AIza")

### 2. Configure Environment Variable
1. Create a `.env` file in your project root directory
2. Add your API key:
```
REACT_APP_GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

### 3. Restart Development Server
```bash
npm start
# or
yarn start
```

## 🔧 Features

### Context-Aware Analysis
The AI assistant has access to:
- **Filtered program data** based on your current dashboard filters
- **SLNSW benchmark performance** (quantitative and qualitative)
- **Summary statistics** (attendance, new members, etc.)
- **Improvement areas** and recommendations
- **Community engagement patterns**

### Smart Question Handling
Ask questions like:
- "What trends do you see in our program attendance?"
- "How are we performing against SLNSW benchmarks?"
- "Which communities need more engagement?"
- "What improvements should we prioritize?"

### Professional Response Format
Responses include:
- Evidence-based insights from your data
- Specific metrics and percentages
- Actionable recommendations
- SLNSW compliance guidance

## 📊 Data Context Provided to AI

### Current Dashboard State
- Active filters (community, suburb, time period)
- Summary statistics and KPIs
- Benchmark health percentage and status

### Program Data
- Filtered program records
- Attendance patterns by community and program type
- New member conversion rates
- Facilitator and location information

### SLNSW Benchmarks
- Quantitative benchmarks (ESL collection, LOTE collection, staffing, research)
- Qualitative benchmarks (feedback mechanisms, cultural competency)
- Current status and justifications
- Performance percentages

### Improvement Areas
- Benchmarks requiring attention
- Current gaps and challenges
- SLNSW 2017 report recommendations

## 🔒 Security & Privacy

### API Key Security
- Store your API key in `.env` file only
- Never commit `.env` to version control
- Add `.env` to your `.gitignore` file
- Use different keys for development/production

### Data Privacy
- Your library data is sent to Google Gemini for analysis
- Review Google's [AI Studio Terms](https://ai.google.dev/terms)
- Consider data sensitivity when asking questions
- Gemini processes requests but doesn't store conversation history

## 🚨 Rate Limits & Costs

### Free Tier Limits
- **15 requests per minute**
- **1,500 requests per day**
- **32,000 characters per request**

### Cost Structure
- Free tier available for development and testing
- Paid plans available for production use
- Check current pricing at [Google AI Pricing](https://ai.google.dev/pricing)

## 🛠️ Troubleshooting

### Common Issues

#### "API key not set" Error
```bash
# Check your .env file exists in project root
ls -la .env

# Verify the content
cat .env
```
- Ensure file is named exactly `.env` (not `.env.txt`)
- Restart your development server after creating/modifying `.env`

#### "403 Forbidden" Error
- Verify your API key is correct
- Check API key permissions in Google AI Studio
- Ensure you're using a valid Gemini API key (not other Google APIs)

#### "429 Rate Limit" Error
- You've exceeded the free tier limits
- Wait for the rate limit to reset
- Consider upgrading to a paid plan for higher limits

#### Network Connection Errors
- Check your internet connection
- Verify firewall/proxy settings
- Try again after a few moments

### Development Tips

#### Testing API Configuration
The dashboard automatically detects API configuration status and shows:
- ✅ Green indicator when properly configured
- ⚠️ Yellow warning with setup instructions when missing/invalid

#### Monitoring Usage
API usage statistics are logged to console (in development):
```javascript
Gemini API Usage: {
  promptTokens: 1234,
  completionTokens: 567,
  totalTokens: 1801
}
```

#### Error Handling
The system provides user-friendly error messages:
- Configuration issues: "AI service configuration issue"
- Network problems: "Network connection issue"
- Rate limits: "Too many requests"
- Service issues: "AI service temporarily unavailable"

## 🎯 Best Practices

### Question Formatting
- Be specific about what you want to analyze
- Reference specific communities, time periods, or benchmarks
- Ask for actionable recommendations

### Effective Prompts
```
✅ Good: "What trends do you see in Chinese community engagement over the last 6 months?"
✅ Good: "Which SLNSW benchmarks need immediate attention and why?"
❌ Avoid: "Tell me about the data"
❌ Avoid: "What should I do?"
```

### Data Filtering
- Set appropriate filters before asking questions
- AI responses are based on currently filtered data
- Use filters to focus analysis on specific communities or time periods

## 📚 API Documentation

### Gemini API Reference
- [Gemini API Documentation](https://ai.google.dev/docs/gemini_api_overview)
- [Model Information](https://ai.google.dev/models/gemini)
- [Safety Settings](https://ai.google.dev/docs/safety_setting_gemini)

### Model Configuration
```javascript
{
  model: "gemini-2.0-flash-latest",
  temperature: 0.3,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048
}
```

## 🆘 Support

### Getting Help
1. Check this documentation first
2. Review error messages in browser console
3. Verify API key configuration
4. Test with simple questions first

### Report Issues
- Include error messages and browser console logs
- Specify browser and operating system
- Describe steps to reproduce the issue

---

**Note**: This AI integration is designed specifically for Georges River Libraries multicultural metrics analysis. The AI has been configured with appropriate context about SLNSW standards and library service requirements. 