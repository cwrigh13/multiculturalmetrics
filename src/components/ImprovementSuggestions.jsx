import React, { useState } from 'react';
import { WarningIcon, ErrorIcon } from './icons';
import { HelpTooltip } from './Tooltip';

const ImprovementSuggestions = ({ improvementAreas }) => {
  const [expandedAreas, setExpandedAreas] = useState(new Set());

  if (!improvementAreas || improvementAreas.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-1">
              All Benchmarks On Track
            </h3>
            <p className="text-sm text-green-700">
              Excellent performance! All SLNSW multicultural service standards are currently being met. 
              Continue monitoring and maintaining current service levels.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const toggleExpanded = (areaId) => {
    const newExpanded = new Set(expandedAreas);
    if (newExpanded.has(areaId)) {
      newExpanded.delete(areaId);
    } else {
      newExpanded.add(areaId);
    }
    setExpandedAreas(newExpanded);
  };

  const getStatusStyling = (status) => {
    switch (status) {
      case "Needs Attention":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          iconColor: "text-yellow-600",
          textColor: "text-yellow-800",
          badgeColor: "bg-yellow-500",
          priority: "Medium Priority",
          priorityIcon: <WarningIcon className="w-5 h-5" />
        };
      case "Off Track":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          textColor: "text-red-800",
          badgeColor: "bg-red-500",
          priority: "High Priority",
          priorityIcon: <ErrorIcon className="w-5 h-5" />
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          iconColor: "text-gray-600",
          textColor: "text-gray-800",
          badgeColor: "bg-gray-500",
          priority: "Review Required",
          priorityIcon: <WarningIcon className="w-5 h-5" />
        };
    }
  };

  const getPriorityLevel = (benchmark) => {
    if (benchmark.status === "Off Track") return 1;
    if (benchmark.status === "Needs Attention") return 2;
    return 3;
  };

  // Sort by priority and then by category name
  const sortedAreas = [...improvementAreas].sort((a, b) => {
    const priorityDiff = getPriorityLevel(a) - getPriorityLevel(b);
    if (priorityDiff !== 0) return priorityDiff;
    return a.category.localeCompare(b.category);
  });

  const criticalCount = improvementAreas.filter(area => area.status === "Off Track").length;
  const attentionCount = improvementAreas.filter(area => area.status === "Needs Attention").length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-yellow-500 rounded-full">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-darkTeal">Improvement Recommendations</h3>
              <p className="text-sm text-teal opacity-75">
                SLNSW 2017 report recommendations for benchmark enhancement
              </p>
            </div>
            <HelpTooltip 
              title="SLNSW 2017 Report Recommendations"
              content="The State Library of NSW 2017 Multicultural Services Report provides evidence-based recommendations for improving library services to culturally and linguistically diverse communities. These suggestions are tailored to address specific benchmark gaps and enhance overall multicultural service delivery effectiveness."
              detail="Recommendations are prioritized based on benchmark status: Off Track items require immediate attention, while Needs Attention items should be addressed through strategic planning and resource allocation."
              size="xl"
            />
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="text-right">
          <div className="text-2xl font-bold text-darkTeal mb-1">
            {improvementAreas.length}
          </div>
          <div className="text-xs text-teal">
            Areas for improvement
          </div>
        </div>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {criticalCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <ErrorIcon className="w-4 h-4 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-800">High Priority</h4>
                <p className="text-sm text-red-700">
                  {criticalCount} benchmark{criticalCount > 1 ? 's' : ''} off track requiring immediate action
                </p>
              </div>
            </div>
          </div>
        )}
        
        {attentionCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <WarningIcon className="w-4 h-4 text-yellow-600" />
              <div>
                <h4 className="font-semibold text-yellow-800">Medium Priority</h4>
                <p className="text-sm text-yellow-700">
                  {attentionCount} benchmark{attentionCount > 1 ? 's' : ''} needing focused attention
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Improvement Areas */}
      <div className="space-y-6">
        {sortedAreas.map((area) => {
          const styling = getStatusStyling(area.status);
          const isExpanded = expandedAreas.has(area.id);
          
          return (
            <div 
              key={area.id} 
              className={`${styling.bgColor} border-2 ${styling.borderColor} rounded-lg overflow-hidden transition-all duration-300`}
            >
              
              {/* Area Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`p-2 ${styling.badgeColor} rounded-full`}>
                      <div className="text-white">
                        {styling.priorityIcon}
                      </div>
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold ${styling.textColor}`}>
                        {area.category}
                      </h4>
                      <p className={`text-sm ${styling.textColor} opacity-75 mb-2`}>
                        {area.description}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 ${styling.badgeColor} text-white rounded-full text-xs font-medium`}>
                        {styling.priority}
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpanded(area.id)}
                    className={`p-2 ${styling.textColor} hover:bg-white hover:bg-opacity-50 rounded-full transition-colors`}
                  >
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Current Status */}
                <div className="bg-white rounded-lg p-4 border border-opacity-50">
                  <div className="flex items-start space-x-3">
                    <div className={`w-4 h-4 ${styling.badgeColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h6 className="text-sm font-semibold text-darkTeal mb-2">Current Status</h6>
                      <p className="text-sm text-darkTeal leading-relaxed">
                        {area.justification}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Recommendations */}
              {isExpanded && (
                <div className="border-t border-opacity-50 bg-white bg-opacity-50">
                  <div className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-5 h-5 bg-lightBlueGreen rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold text-darkTeal mb-2">
                          SLNSW 2017 Report Recommendations
                        </h5>
                        <p className="text-sm text-teal mb-4">
                          Evidence-based strategies for improving {area.category.toLowerCase()} performance:
                        </p>
                      </div>
                    </div>

                    {/* Recommendations List */}
                    <div className="space-y-3">
                      {area.suggestions && area.suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-lightBlueGreen hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-lightBlueGreen bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-lightBlueGreen">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-darkTeal leading-relaxed">
                                {suggestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Implementation Priority */}
                    <div className={`mt-4 ${styling.bgColor} border ${styling.borderColor} rounded-lg p-4`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-4 h-4 ${styling.badgeColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h6 className={`text-sm font-semibold ${styling.textColor} mb-1`}>
                            Implementation Timeline
                          </h6>
                          <p className={`text-xs ${styling.textColor} opacity-75`}>
                            {area.status === "Off Track" 
                              ? "Immediate action required - implement within 3-6 months"
                              : "Strategic improvement - implement within 6-12 months through planned resource allocation"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Summary */}
      <div className="mt-8 bg-lightCyan border border-lightBlueGreen rounded-lg p-6">
        <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-lightBlueGreen rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h5 className="text-lg font-semibold text-darkTeal mb-3">Next Steps</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-sm font-semibold text-darkTeal mb-2">Immediate Actions</h6>
                <ul className="text-sm text-teal space-y-1">
                  <li>• Prioritize high-priority (Off Track) benchmarks</li>
                  <li>• Allocate resources for immediate improvements</li>
                  <li>• Establish implementation timelines</li>
                </ul>
              </div>
              <div>
                <h6 className="text-sm font-semibold text-darkTeal mb-2">Strategic Planning</h6>
                <ul className="text-sm text-teal space-y-1">
                  <li>• Integrate medium-priority items into annual planning</li>
                  <li>• Engage community stakeholders in solution development</li>
                  <li>• Monitor progress through regular benchmark assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions; 