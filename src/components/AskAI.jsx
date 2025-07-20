import React, { useState, useEffect } from 'react';
import { HelpTooltip } from './Tooltip';
import { getConfigurationStatus } from '../config/gemini.config';

const AskAI = ({ onQuery, response, query, error, isLoading, onClear }) => {
  const [inputValue, setInputValue] = useState('');
  const [configStatus, setConfigStatus] = useState(null);

  // Check API configuration on component mount
  useEffect(() => {
    const status = getConfigurationStatus();
    setConfigStatus(status);
  }, []);

  // Update input when external query changes
  useEffect(() => {
    if (query) {
      setInputValue(query);
    }
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Call the parent component's query handler
    onQuery(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    if (onClear) {
      onClear();
    }
  };

  const handleSampleQuestion = (sampleQuestion) => {
    if (isLoading) return;
    setInputValue(sampleQuestion);
  };

  const sampleQuestions = [
    "What is the overall attendance pattern for multicultural programs?",
    "How effective are we at converting attendees to new members?",
    "Which communities are most engaged with our programs?",
    "How are we performing against SLNSW benchmarks?",
    "What improvements should we prioritize for multicultural services?",
    "What trends do you see in our program attendance over time?",
    "How can we better serve our Chinese-speaking patrons?",
    "What are our strongest and weakest benchmark areas?"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-lightBlueGreen rounded-full">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-darkTeal">Ask AI Assistant</h3>
              <p className="text-sm text-teal opacity-75">
                Get insights about your multicultural metrics and SLNSW benchmarks
              </p>
            </div>
            <HelpTooltip 
              title="AI Assistant Features"
              content="The AI Assistant can analyze your multicultural program data, benchmark performance, and community engagement metrics to provide insights, identify trends, and suggest improvements. Ask questions about attendance patterns, community engagement, benchmark compliance, or strategic recommendations."
              detail="AI responses are based on your current dashboard data including program attendance, new member conversions, community demographics, and SLNSW benchmark status."
              size="xl"
            />
          </div>
        </div>
      </div>

      {/* API Configuration Status */}
      {configStatus && !configStatus.configured && (
        <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                AI Assistant Setup Required
              </h4>
              <p className="text-sm text-yellow-700 mb-4">
                {configStatus.message}
              </p>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-3">Quick Setup Instructions:</h5>
                <ol className="text-sm text-yellow-700 space-y-2 list-decimal list-inside">
                  <li>
                    <strong>Get your API key:</strong> Visit{' '}
                    <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-800 underline hover:text-yellow-900"
                    >
                      Google AI Studio
                    </a>
                    {' '}and create a new API key
                  </li>
                  <li>
                    <strong>Create .env file:</strong> In your project root, create a{' '}
                    <code className="bg-yellow-100 px-2 py-1 rounded text-xs">.env</code> file
                  </li>
                  <li>
                    <strong>Add your key:</strong> Add this line to your .env file:
                    <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono">
                      REACT_APP_GEMINI_API_KEY=your_api_key_here
                    </div>
                  </li>
                  <li>
                    <strong>Restart:</strong> Restart your development server to load the new environment variable
                  </li>
                </ol>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-xs text-yellow-700">
                    <strong>Note:</strong> Your API key should start with "AIza" and be about 39 characters long. 
                    Never commit your .env file to version control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Configuration Status */}
      {configStatus && configStatus.configured && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              Gemini AI is connected and ready to analyze your data
            </span>
          </div>
        </div>
      )}

      {/* Query Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="ai-question" className="block text-sm font-semibold text-darkTeal mb-3">
            Ask a question about your multicultural services:
          </label>
          <div className="relative">
            <textarea
              id="ai-question"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={configStatus?.configured 
                ? "e.g., How can we improve our community engagement? What trends do you see in our data?"
                : "Please configure your Gemini API key first to use the AI assistant"
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              rows="4"
              disabled={isLoading || !configStatus?.configured}
            />
            {/* Character count */}
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {inputValue.length}/500
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 justify-center">
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || !configStatus?.configured}
            className="bg-lightBlueGreen text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>{configStatus?.configured ? 'Ask AI' : 'Setup Required'}</span>
              </>
            )}
          </button>
          
          {(inputValue || response) && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Sample Questions - only show when configured */}
      {configStatus?.configured && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-darkTeal mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 text-lightBlueGreen" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Try these sample questions:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center">
            {sampleQuestions.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuestion(sample)}
                className="text-left text-sm bg-lightCyan hover:bg-lightBlueGreen hover:bg-opacity-10 text-darkTeal px-4 py-3 rounded-lg transition-all duration-200 border border-lightBlueGreen border-opacity-30 hover:border-lightBlueGreen disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md"
                disabled={isLoading}
              >
                <span className="font-medium">💡</span> {sample}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mb-6">
          <div className="bg-lightCyan border-2 border-lightBlueGreen rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg className="animate-spin w-5 h-5 text-lightBlueGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-lightBlueGreen rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-darkTeal mb-1">
                  Thinking...
                </div>
                <div className="text-sm text-teal">
                  AI is analyzing your multicultural metrics and generating insights...
                </div>
                {/* Animated thinking dots */}
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-lightBlueGreen rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-lightBlueGreen rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-lightBlueGreen rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h5 className="font-semibold text-red-800 mb-1">Unable to Process Request</h5>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Response Display */}
      {response && !isLoading && (
        <div className="mb-6">
          <div className="bg-white border-2 border-lightBlueGreen rounded-lg overflow-hidden">
            {/* Response Header */}
            <div className="bg-lightBlueGreen px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-lightBlueGreen" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-semibold text-white">AI Assistant Response</h5>
                  <p className="text-lightCyan text-sm">Based on your multicultural metrics data</p>
                </div>
              </div>
            </div>
            
            {/* Response Content */}
            <div className="px-6 py-6">
              <div className="prose prose-sm max-w-none">
                <div className="text-darkTeal leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            </div>
            
            {/* Response Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  Response generated based on current dashboard data
                </div>
                <button
                  onClick={handleClear}
                  className="text-xs text-lightBlueGreen hover:text-teal font-medium transition-colors"
                >
                  Clear Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Context Information */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h6 className="text-sm font-semibold text-gray-700 mb-2">What the AI can help with:</h6>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Data Analysis:</strong> Trends, patterns, and insights from your program metrics</li>
              <li>• <strong>Benchmark Assessment:</strong> Performance against SLNSW standards and improvement recommendations</li>
              <li>• <strong>Community Insights:</strong> Engagement patterns and demographic analysis</li>
              <li>• <strong>Strategic Guidance:</strong> Evidence-based recommendations for multicultural service enhancement</li>
            </ul>
            <div className="mt-3 text-xs text-gray-500 italic">
              Note: This AI assistant provides insights based on your current dashboard data and SLNSW benchmarks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAI; 