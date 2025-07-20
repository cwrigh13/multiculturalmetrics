import React from 'react';

// Color configuration for different status types
const STATUS_COLORS = {
  "On Track": {
    bg: "bg-lightBlueGreen",
    text: "text-lightBlueGreen",
    border: "border-lightBlueGreen",
    gradient: "from-lightBlueGreen to-teal",
    light: "bg-lightBlueGreen bg-opacity-10",
    ring: "ring-lightBlueGreen"
  },
  "Needs Attention": {
    bg: "bg-yellow-500",
    text: "text-yellow-600",
    border: "border-yellow-400",
    gradient: "from-yellow-400 to-yellow-600",
    light: "bg-yellow-50",
    ring: "ring-yellow-400"
  },
  "Off Track": {
    bg: "bg-red-500",
    text: "text-red-600",
    border: "border-red-400",
    gradient: "from-red-400 to-red-600",
    light: "bg-red-50",
    ring: "ring-red-400"
  },
  "Excellent": {
    bg: "bg-green-500",
    text: "text-green-600",
    border: "border-green-400",
    gradient: "from-green-400 to-green-600",
    light: "bg-green-50",
    ring: "ring-green-400"
  }
};

// Enhanced Progress Bar Component
export const ProgressBar = ({ 
  percentage, 
  status = "On Track", 
  height = "h-4", 
  showLabel = true,
  showPercentage = true,
  label = "",
  animated = true,
  className = ""
}) => {
  const safePercentage = Math.min(Math.max(percentage || 0, 0), 100);
  const colors = STATUS_COLORS[status] || STATUS_COLORS["On Track"];

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-darkTeal">{label}</span>
          {showPercentage && (
            <span className={`text-sm font-bold ${colors.text}`}>
              {safePercentage}%
            </span>
          )}
        </div>
      )}
      
      {/* Progress Bar Container */}
      <div className={`w-full bg-gray-200 rounded-full ${height} relative overflow-hidden shadow-inner`}>
        {/* Progress Fill */}
        <div 
          className={`${height} rounded-full relative ${colors.bg} ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ width: `${safePercentage}%` }}
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-80 rounded-full`}></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-transparent to-transparent opacity-20 rounded-full"></div>
          
          {/* Pulse Animation for Active Progress */}
          {animated && safePercentage > 0 && (
            <div className={`absolute inset-0 ${colors.bg} rounded-full animate-pulse opacity-30`}></div>
          )}
        </div>
        
        {/* Percentage Label Inside Bar */}
        {showLabel && safePercentage > 25 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">
              {safePercentage}%
            </span>
          </div>
        )}
      </div>
      
      {/* Percentage Label Outside Bar */}
      {showLabel && safePercentage <= 25 && showPercentage && (
        <div className={`text-xs font-bold ${colors.text} mt-1`}>
          {safePercentage}%
        </div>
      )}
    </div>
  );
};

// Circular Progress Gauge Component
export const ProgressGauge = ({ 
  percentage, 
  status = "On Track", 
  size = "w-24 h-24",
  strokeWidth = 4,
  showPercentage = true,
  label = "",
  animated = true
}) => {
  const safePercentage = Math.min(Math.max(percentage || 0, 0), 100);
  const colors = STATUS_COLORS[status] || STATUS_COLORS["On Track"];
  
  // Calculate circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Progress */}
      <div className={`${size} relative`}>
        <svg 
          className={`${size} transform -rotate-90 ${animated ? 'transition-transform duration-1000' : ''}`} 
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colors.text} ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentage && (
            <span className={`text-lg font-bold ${colors.text}`}>
              {safePercentage}%
            </span>
          )}
        </div>
      </div>
      
      {/* Label */}
      {label && (
        <span className="text-xs font-medium text-darkTeal mt-2 text-center">
          {label}
        </span>
      )}
    </div>
  );
};

// Multi-Segment Progress Bar
export const MultiProgressBar = ({ 
  segments, 
  height = "h-6",
  showLabels = true,
  animated = true 
}) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div className="w-full">
      {/* Multi-segment Bar */}
      <div className={`w-full bg-gray-200 rounded-full ${height} relative overflow-hidden flex shadow-inner`}>
        {segments.map((segment, index) => {
          const percentage = total > 0 ? (segment.value / total) * 100 : 0;
          const colors = STATUS_COLORS[segment.status] || STATUS_COLORS["On Track"];
          
          return (
            <div
              key={index}
              className={`${colors.bg} relative ${animated ? 'transition-all duration-1000 ease-out' : ''} ${index === 0 ? 'rounded-l-full' : ''} ${index === segments.length - 1 ? 'rounded-r-full' : ''}`}
              style={{ width: `${percentage}%` }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-80 ${index === 0 ? 'rounded-l-full' : ''} ${index === segments.length - 1 ? 'rounded-r-full' : ''}`}></div>
              
              {/* Label inside segment if wide enough */}
              {percentage > 15 && showLabels && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow">
                    {segment.value}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      {showLabels && (
        <div className="flex flex-wrap gap-4 mt-3">
          {segments.map((segment, index) => {
            const colors = STATUS_COLORS[segment.status] || STATUS_COLORS["On Track"];
            const percentage = total > 0 ? ((segment.value / total) * 100).toFixed(1) : 0;
            
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${colors.bg}`}></div>
                <span className="text-xs text-darkTeal">
                  <strong>{segment.label}:</strong> {segment.value} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Status Indicator with Progress
export const StatusProgress = ({ 
  status, 
  percentage, 
  title,
  description,
  size = "md" 
}) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS["On Track"];
  
  const sizeClasses = {
    sm: "p-3",
    md: "p-4", 
    lg: "p-6"
  };

  return (
    <div className={`bg-white rounded-lg border-2 ${colors.border} ${sizeClasses[size]} hover:shadow-md transition-shadow duration-200`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-darkTeal">{title}</h4>
          {description && (
            <p className="text-sm text-teal mt-1">{description}</p>
          )}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${colors.light} ${colors.text} ${colors.border} border`}>
          {status}
        </div>
      </div>
      
      {/* Progress */}
      <ProgressBar 
        percentage={percentage}
        status={status}
        height="h-3"
        showLabel={false}
        animated={true}
      />
      
      {/* Footer */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-teal">Progress</span>
        <span className={`text-sm font-bold ${colors.text}`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// Benchmark Dashboard Component
export const BenchmarkDashboard = ({ benchmarks }) => {
  // Calculate overall statistics
  const totalBenchmarks = benchmarks.length;
  const onTrack = benchmarks.filter(b => b.status === "On Track").length;
  const needsAttention = benchmarks.filter(b => b.status === "Needs Attention").length;
  const offTrack = benchmarks.filter(b => b.status === "Off Track").length;
  
  const overallPercentage = totalBenchmarks > 0 
    ? Math.round((onTrack / totalBenchmarks) * 100) 
    : 0;
  
  const getOverallStatus = () => {
    if (overallPercentage >= 90) return "Excellent";
    if (overallPercentage >= 75) return "On Track";
    if (overallPercentage >= 50) return "Needs Attention";
    return "Off Track";
  };

  const segments = [
    { label: "On Track", value: onTrack, status: "On Track" },
    { label: "Needs Attention", value: needsAttention, status: "Needs Attention" },
    { label: "Off Track", value: offTrack, status: "Off Track" }
  ].filter(segment => segment.value > 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-darkTeal mb-6">Benchmark Performance Overview</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Progress Gauge */}
        <div className="text-center">
          <ProgressGauge 
            percentage={overallPercentage}
            status={getOverallStatus()}
            size="w-32 h-32"
            strokeWidth={6}
            label="Overall Performance"
            animated={true}
          />
          
          {/* Summary Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-lightBlueGreen bg-opacity-10 rounded">
              <div className="text-lg font-bold text-lightBlueGreen">{onTrack}</div>
              <div className="text-xs text-darkTeal">On Track</div>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <div className="text-lg font-bold text-yellow-600">{needsAttention}</div>
              <div className="text-xs text-darkTeal">Need Attention</div>
            </div>
            <div className="p-2 bg-red-50 rounded">
              <div className="text-lg font-bold text-red-600">{offTrack}</div>
              <div className="text-xs text-darkTeal">Off Track</div>
            </div>
          </div>
        </div>
        
        {/* Breakdown Progress */}
        <div>
          <h4 className="font-semibold text-darkTeal mb-4">Performance Breakdown</h4>
          <MultiProgressBar 
            segments={segments}
            height="h-8"
            showLabels={true}
            animated={true}
          />
          
          {/* Progress Details */}
          <div className="mt-4 space-y-2">
            <ProgressBar 
              percentage={overallPercentage}
              status={getOverallStatus()}
              label="Overall Achievement"
              height="h-4"
              animated={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
export default {
  ProgressBar,
  ProgressGauge,
  MultiProgressBar,
  StatusProgress,
  BenchmarkDashboard
}; 