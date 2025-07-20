import React from 'react';
import { ProgressBar } from './ProgressComponents';
import { HelpTooltip } from './Tooltip';
import { TickIcon, WarningIcon, ErrorIcon } from './icons';

const BenchmarkHealthSummary = ({ 
  benchmarkHealth, 
  quantitativeBenchmarks = [], 
  qualitativeBenchmarks = [] 
}) => {
  
  if (!benchmarkHealth) return null;

  const { percentage, healthMessage, healthStatus, onTrackCount, totalCount } = benchmarkHealth;

  // Calculate breakdown by status
  const allBenchmarks = [...quantitativeBenchmarks, ...qualitativeBenchmarks];
  const needsAttentionCount = allBenchmarks.filter(b => b.status === "Needs Attention").length;
  const offTrackCount = allBenchmarks.filter(b => b.status === "Off Track").length;

  // Get health status styling
  const getHealthStyling = () => {
    switch (healthStatus) {
      case "Excellent":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          textColor: "text-green-800",
          badgeColor: "bg-green-500",
          progressStatus: "Excellent"
        };
      case "Good":
        return {
          bgColor: "bg-lightCyan",
          borderColor: "border-lightBlueGreen",
          iconColor: "text-lightBlueGreen",
          textColor: "text-darkTeal",
          badgeColor: "bg-lightBlueGreen",
          progressStatus: "On Track"
        };
      case "Needs Attention":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          iconColor: "text-yellow-600",
          textColor: "text-yellow-800",
          badgeColor: "bg-yellow-500",
          progressStatus: "Needs Attention"
        };
      case "Critical":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          textColor: "text-red-800",
          badgeColor: "bg-red-500",
          progressStatus: "Off Track"
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          iconColor: "text-gray-600",
          textColor: "text-gray-800",
          badgeColor: "bg-gray-500",
          progressStatus: "On Track"
        };
    }
  };

  const getHealthIcon = () => {
    switch (healthStatus) {
      case "Excellent":
      case "Good":
        return <TickIcon className={`w-5 h-5 ${styling.iconColor}`} />;
      case "Needs Attention":
        return <WarningIcon className={`w-5 h-5 ${styling.iconColor}`} />;
      case "Critical":
        return <ErrorIcon className={`w-5 h-5 ${styling.iconColor}`} />;
      default:
        return <TickIcon className={`w-5 h-5 ${styling.iconColor}`} />;
    }
  };

  const styling = getHealthStyling();

  return (
    <div className={`${styling.bgColor} rounded-lg border-2 ${styling.borderColor} p-6 mb-6`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 ${styling.badgeColor} rounded-full`}>
            {getHealthIcon()}
          </div>
          <div className="flex items-center space-x-2">
            <div>
              <h3 className={`text-2xl font-bold ${styling.textColor}`}>
                Benchmark Health Summary
              </h3>
              <p className="text-sm text-teal opacity-75">
                Overall SLNSW compliance performance assessment
              </p>
            </div>
            <HelpTooltip 
              title="Benchmark Health Assessment"
              content="The Benchmark Health Summary provides an overall assessment of Georges River Libraries' performance against all SLNSW multicultural service standards. This includes both quantitative benchmarks (collection sizes, staffing levels, research frequency) and qualitative benchmarks (feedback mechanisms, staff training). The health score is calculated based on the percentage of benchmarks currently 'On Track'."
              detail="Health status ranges: Excellent (90%+), Good (75-89%), Needs Attention (60-74%), Critical (<60%). Current performance reflects strong multicultural service delivery across all measured areas."
              size="xl"
            />
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`px-4 py-2 ${styling.badgeColor} text-white rounded-full font-semibold`}>
          {healthStatus}
        </div>
      </div>

      {/* Main Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        
        {/* On Track Count */}
        <div className="bg-white rounded-lg p-4 border border-lightBlueGreen text-center">
          <div className="flex items-center justify-center mb-2">
            <TickIcon className="w-4 h-4 text-lightBlueGreen mr-2" />
            <span className="text-xs font-semibold text-teal uppercase tracking-wide">
              On Track
            </span>
          </div>
          <div className="text-3xl font-bold text-lightBlueGreen mb-1">
            {onTrackCount}
          </div>
          <div className="text-xs text-teal">
            of {totalCount} benchmarks
          </div>
        </div>

        {/* Needs Attention Count */}
        <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <WarningIcon className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">
              Need Attention
            </span>
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-1">
            {needsAttentionCount}
          </div>
          <div className="text-xs text-yellow-700">
            requiring focus
          </div>
        </div>

        {/* Off Track Count */}
        <div className="bg-white rounded-lg p-4 border border-red-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <ErrorIcon className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              Off Track
            </span>
          </div>
          <div className="text-3xl font-bold text-red-600 mb-1">
            {offTrackCount}
          </div>
          <div className="text-xs text-red-700">
            needing action
          </div>
        </div>

        {/* Overall Percentage */}
        <div className={`bg-white rounded-lg p-4 border ${styling.borderColor} text-center`}>
          <div className="flex items-center justify-center mb-2">
            <div className={`w-4 h-4 ${styling.badgeColor} rounded-full mr-2`}></div>
            <span className={`text-xs font-semibold ${styling.textColor} uppercase tracking-wide`}>
              Health Score
            </span>
          </div>
          <div className={`text-3xl font-bold ${styling.textColor} mb-1`}>
            {percentage}%
          </div>
          <div className={`text-xs ${styling.textColor} opacity-75`}>
            overall compliance
          </div>
        </div>
      </div>

      {/* Full-Width Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-lg font-semibold ${styling.textColor}`}>
            Overall Benchmark Compliance
          </h4>
          <span className={`text-sm font-bold ${styling.textColor}`}>
            {onTrackCount}/{totalCount} Benchmarks On Track
          </span>
        </div>
        
        {/* Enhanced Progress Bar */}
        <ProgressBar 
          percentage={percentage}
          status={styling.progressStatus}
          height="h-8"
          showLabel={true}
          animated={true}
          className="mb-3"
        />
        
        {/* Progress Bar Legend */}
        <div className="flex justify-between items-center text-xs text-teal">
          <span>0% - Critical</span>
          <span>60% - Needs Attention</span>
          <span>75% - Good</span>
          <span>90% - Excellent</span>
        </div>
      </div>

      {/* Health Status Message */}
      <div className="bg-white rounded-lg p-6 border border-lightBlueGreen">
        <div className="flex items-start space-x-4">
          <div className={`w-10 h-10 ${styling.badgeColor} rounded-full flex items-center justify-center flex-shrink-0`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h5 className={`text-lg font-semibold ${styling.textColor} mb-2`}>
              Assessment Summary
            </h5>
            <p className={`text-sm ${styling.textColor} leading-relaxed mb-3`}>
              {healthMessage}
            </p>
            
            {/* Additional Context Based on Performance */}
            {percentage >= 90 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>Outstanding Performance:</strong> Georges River Libraries demonstrates exemplary compliance with SLNSW multicultural service standards. This level of achievement reflects strong organizational commitment to serving culturally and linguistically diverse communities.
                </p>
              </div>
            )}
            
            {percentage >= 75 && percentage < 90 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Strong Performance:</strong> Library services meet most SLNSW standards with opportunity for enhancement in specific areas. Focused improvements will elevate service delivery to excellence.
                </p>
              </div>
            )}
            
            {percentage >= 60 && percentage < 75 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Improvement Opportunity:</strong> Several benchmark areas require attention to meet SLNSW standards. Strategic planning and resource allocation can address these gaps effectively.
                </p>
              </div>
            )}
            
            {percentage < 60 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Priority Action Required:</strong> Significant gaps exist in meeting SLNSW standards. Immediate strategic intervention and resource commitment needed to improve multicultural service delivery.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Breakdown by Category */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quantitative Benchmarks Summary */}
        <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
          <h6 className="font-semibold text-darkTeal mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-lightBlueGreen" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Quantitative Standards
          </h6>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-darkTeal">On Track:</span>
              <span className="font-bold text-lightBlueGreen">
                {quantitativeBenchmarks.filter(b => b.status === "On Track").length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-darkTeal">Need Attention:</span>
              <span className="font-bold text-yellow-600">
                {quantitativeBenchmarks.filter(b => b.status === "Needs Attention").length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-darkTeal">Off Track:</span>
              <span className="font-bold text-red-600">
                {quantitativeBenchmarks.filter(b => b.status === "Off Track").length}
              </span>
            </div>
          </div>
        </div>

        {/* Qualitative Benchmarks Summary */}
        <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
          <h6 className="font-semibold text-darkTeal mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-lightBlueGreen" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
            </svg>
            Qualitative Standards
          </h6>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-darkTeal">On Track:</span>
              <span className="font-bold text-lightBlueGreen">
                {qualitativeBenchmarks.filter(b => b.status === "On Track").length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-darkTeal">Need Attention:</span>
              <span className="font-bold text-yellow-600">
                {qualitativeBenchmarks.filter(b => b.status === "Needs Attention").length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-darkTeal">Off Track:</span>
              <span className="font-bold text-red-600">
                {qualitativeBenchmarks.filter(b => b.status === "Off Track").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkHealthSummary; 