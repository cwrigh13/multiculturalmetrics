// Google Gemini API Service Configuration
// Using gemini-2.0-flash model for multicultural metrics analysis

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-latest:generateContent';

// Get API key from environment variable
const getAPIKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY environment variable is not set');
  }
  return apiKey;
};

// Format context data for Gemini API
const formatContextData = (contextData) => {
  const {
    filteredPrograms,
    summaryStats,
    quantitativeBenchmarks,
    qualitativeBenchmarks,
    improvementAreas,
    benchmarkHealth,
    currentFilters,
    suggestions
  } = contextData;

  // Create a comprehensive context string for the AI
  const context = `
GEORGES RIVER LIBRARIES MULTICULTURAL METRICS DASHBOARD DATA:

CURRENT FILTERS:
- Community: ${currentFilters.community}
- Suburb: ${currentFilters.suburb}
- Time Period: ${currentFilters.timePeriod}

SUMMARY STATISTICS:
- Total CALD Program Attendees: ${summaryStats.totalCALDAttendees}
- New CALD Members: ${summaryStats.newCALDMembers}
- Multilingual Collection Loans: ${summaryStats.multilingualLoans}
- Staff Cultural Training Completion: ${summaryStats.staffTrainingCompletion}%
- Total Programs: ${filteredPrograms.length}
- Average Attendance: ${summaryStats.avgAttendance}
- Unique Communities Served: ${summaryStats.uniqueCommunities}

BENCHMARK HEALTH OVERVIEW:
- Overall Health Score: ${benchmarkHealth.percentage}%
- Health Status: ${benchmarkHealth.healthStatus}
- Benchmarks On Track: ${benchmarkHealth.onTrackCount} of ${benchmarkHealth.totalCount}
- Health Message: ${benchmarkHealth.healthMessage}

SLNSW QUANTITATIVE BENCHMARKS:
${quantitativeBenchmarks.map(benchmark => `
- ${benchmark.category}: ${benchmark.status} (${benchmark.percentage}%)
  Target: ${benchmark.target}
  Actual: ${benchmark.actual}
  Justification: ${benchmark.justification}`).join('')}

SLNSW QUALITATIVE BENCHMARKS:
${qualitativeBenchmarks.map(benchmark => `
- ${benchmark.category}: ${benchmark.status}
  Description: ${benchmark.description}
  Justification: ${benchmark.justification}
  Evidence: ${benchmark.evidence || 'Not specified'}`).join('')}

IMPROVEMENT AREAS REQUIRING ATTENTION:
${improvementAreas.length > 0 ? improvementAreas.map(area => `
- ${area.category} (${area.status}): ${area.justification}`).join('') : 'No areas requiring immediate attention - all benchmarks are on track!'}

RECENT PROGRAM DATA SAMPLE (Top 10):
${filteredPrograms.slice(0, 10).map(program => `
- ${program.programType} for ${program.community} community in ${program.suburb}
  Date: ${program.date}, Attendance: ${program.attendance}, New Members: ${program.newMembers}
  Facilitator: ${program.facilitator}`).join('')}

COMMUNITY ENGAGEMENT PATTERNS:
- Top Communities by Attendance: ${Object.entries(summaryStats.attendanceByCommunity || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([community, attendance]) => `${community} (${attendance})`)
    .join(', ')}

- Top Program Types: ${Object.entries(summaryStats.attendanceByProgramType || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([type, attendance]) => `${type} (${attendance})`)
    .join(', ')}

MULTICULTURAL SERVICE STANDARDS CONTEXT:
Georges River Libraries operates under State Library of NSW (SLNSW) multicultural service standards which require:
- Adequate LOTE (Languages Other Than English) collections
- Specialist multicultural librarian staffing
- Regular community needs assessment
- Cultural competency training for staff
- Systematic feedback collection mechanisms

Please provide insights, analysis, and recommendations based on this comprehensive data.`;

  return context;
};

// Generate system prompt for multicultural library context
const getSystemPrompt = () => {
  return `You are an expert library consultant specializing in multicultural services and SLNSW (State Library of NSW) compliance. You analyze library data to provide insights about:

1. Program performance and community engagement
2. SLNSW benchmark compliance and improvement strategies
3. Community demographics and service gaps
4. Strategic recommendations for multicultural service enhancement
5. Data trends and patterns in multicultural programming

Your responses should be:
- Professional and evidence-based
- Specific to the provided data
- Actionable with clear recommendations
- Focused on multicultural library service excellence
- Compliant with SLNSW standards and best practices

Format your responses clearly with bullet points, specific metrics, and practical next steps when appropriate.`;
};

// Make API call to Google Gemini
export const queryGeminiAPI = async (userQuery, contextData) => {
  try {
    const apiKey = getAPIKey();
    const formattedContext = formatContextData(contextData);
    const systemPrompt = getSystemPrompt();

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\n${formattedContext}\n\nUser Question: ${userQuery}\n\nPlease provide a comprehensive analysis and recommendations based on the Georges River Libraries data above.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
        stopSequences: []
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      
      // Handle specific API errors
      switch (response.status) {
        case 400:
          throw new Error('Invalid request format. Please rephrase your question.');
        case 403:
          throw new Error('API access forbidden. Please check your API key permissions.');
        case 429:
          throw new Error('Too many requests. Please wait a moment and try again.');
        case 500:
          throw new Error('Gemini service temporarily unavailable. Please try again later.');
        default:
          throw new Error(`API error (${response.status}): ${errorData?.error?.message || 'Unknown error occurred'}`);
      }
    }

    const data = await response.json();

    // Validate response structure
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated. Please try rephrasing your question.');
    }

    const candidate = data.candidates[0];
    
    // Check for safety filtering
    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Response was filtered for safety. Please rephrase your question.');
    }

    // Check for content filtering
    if (candidate.finishReason === 'RECITATION') {
      throw new Error('Response was filtered due to content policy. Please try a different question.');
    }

    // Extract the response text
    const responseText = candidate.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('Empty response received. Please try asking your question differently.');
    }

    return {
      success: true,
      response: responseText.trim(),
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount || 0,
        completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: data.usageMetadata?.totalTokenCount || 0
      }
    };

  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network connection failed. Please check your internet connection and try again.'
      };
    }

    // Handle API key errors
    if (error.message.includes('API key')) {
      return {
        success: false,
        error: 'API configuration error. Please contact the system administrator.'
      };
    }

    // Return the specific error message
    return {
      success: false,
      error: error.message || 'An unexpected error occurred while processing your request.'
    };
  }
};

// Utility function to validate API key format
export const validateAPIKey = (apiKey) => {
  if (!apiKey) return false;
  // Gemini API keys typically start with 'AIza' and are around 39 characters
  return apiKey.startsWith('AIza') && apiKey.length >= 35;
};

// Test API connectivity
export const testGeminiConnection = async () => {
  try {
    const testContextData = {
      filteredPrograms: [],
      summaryStats: { totalCALDAttendees: 0 },
      quantitativeBenchmarks: [],
      qualitativeBenchmarks: [],
      improvementAreas: [],
      benchmarkHealth: { percentage: 0, healthStatus: 'Testing' },
      currentFilters: { community: 'All', suburb: 'All', timePeriod: 'YTD' },
      suggestions: {}
    };

    const result = await queryGeminiAPI('Test connection', testContextData);
    return result.success;
  } catch (error) {
    console.error('Gemini API connection test failed:', error);
    return false;
  }
};

export default { queryGeminiAPI, validateAPIKey, testGeminiConnection }; 