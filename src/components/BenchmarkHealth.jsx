import React from 'react';
import { TickIcon, WarningIcon, ErrorIcon } from './icons';
import { 
  ProgressBar, 
  ProgressGauge, 
  MultiProgressBar, 
  StatusProgress,
  BenchmarkDashboard 
} from './ProgressComponents';

const BenchmarkHealth = ({ benchmarkHealth, improvementAreas }) => {
  // Safety check for undefined props
  if (!benchmarkHealth || !improvementAreas) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkTeal mx-auto mb-4"></div>
          <p className="text-darkTeal font-medium">Loading benchmark data...</p>
        </div>
      </div>
    );
  }
  
  const getHealthStatus = (percentage) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "On Track";
    if (percentage >= 60) return "Needs Attention";
    return "Off Track";
  };

  const getHealthIcon = (percentage) => {
    if (percentage >= 90) return <TickIcon className="w-5 h-5 text-lightBlueGreen" />;
    if (percentage >= 75) return <TickIcon className="w-5 h-5 text-teal" />;
    if (percentage >= 60) return <WarningIcon className="w-5 h-5 text-yellow-600" />;
    return <ErrorIcon className="w-5 h-5 text-red-600" />;
  };

  const getRecommendation = (benchmark) => {
    const recommendations = {
      "esl-collection": "Continue current excellent provision while exploring additional specialized ESL programs",
      "lote-collection-minimum": "Maintain current collection size and consider targeted expansion",
      "lote-collection-proportion": "Prioritize acquisition of LOTE materials to reach 5% target",
      "lote-collection-significant": "Maintain current language coverage and monitor for emerging community groups",
      "specialist-staffing": "Recruit additional 0.4 FTE multicultural services librarian",
      "research-frequency": "Schedule annual community needs assessment and implement feedback systems",
      "feedback-mechanisms": "Expand feedback analysis to identify emerging trends and opportunities",
      "staff-cultural-competency": "Implement advanced cultural competency modules for specialized roles"
    };
    
    return recommendations[benchmark.id] || benchmark.recommendation || "Review and develop improvement strategy";
  };

  // Create segments for multi-progress bar
  const createProgressSegments = () => {
    const total = benchmarkHealth.totalCount;
    const onTrack = benchmarkHealth.onTrackCount;
    const needsAttention = improvementAreas && improvementAreas.filter ? 
      improvementAreas.filter(area => area.status === "Needs Attention").length : 0;
    const offTrack = improvementAreas && improvementAreas.filter ? 
      improvementAreas.filter(area => area.status === "Off Track").length : 0;
    
    return [
      { label: "On Track", value: onTrack, status: "On Track" },
      { label: "Needs Attention", value: needsAttention, status: "Needs Attention" },
      { label: "Off Track", value: offTrack, status: "Off Track" }
    ].filter(segment => segment.value > 0);
  };

  const overallStatus = getHealthStatus(benchmarkHealth.percentage);
  const progressSegments = createProgressSegments();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-darkTeal mb-2">Benchmark Health Summary</h3>
        <p className="text-sm text-teal opacity-75">
          Overall performance assessment and improvement recommendations
        </p>
      </div>
      
      {/* Enhanced Overall Health Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Health Gauge */}
        <div className="lg:col-span-1">
          <div className="bg-lightCyan rounded-lg p-6 text-center border border-lightBlueGreen">
            <ProgressGauge 
              percentage={benchmarkHealth.percentage}
              status={overallStatus}
              size="w-32 h-32"
              strokeWidth={8}
              label="Overall Health Score"
              animated={true}
            />
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-darkTeal">{benchmarkHealth.healthStatus}</h4>
              <p className="text-sm text-teal mt-1">{benchmarkHealth.healthMessage}</p>
            </div>
          </div>
        </div>
        
        {/* Performance Breakdown */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 border border-lightBlueGreen">
            <h4 className="text-lg font-semibold text-darkTeal mb-4">Performance Breakdown</h4>
            
            {/* Multi-segment Progress Bar */}
            <MultiProgressBar 
              segments={progressSegments}
              height="h-8"
              showLabels={true}
              animated={true}
            />
            
            {/* Detailed Progress Bars */}
            <div className="mt-6 space-y-4">
              <ProgressBar 
                percentage={benchmarkHealth.percentage}
                status={overallStatus}
                label="Overall Achievement"
                height="h-4"
                animated={true}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-lightBlueGreen bg-opacity-10 rounded-lg">
                  <div className="text-2xl font-bold text-lightBlueGreen">{benchmarkHealth.onTrackCount}</div>
                  <div className="text-xs text-darkTeal">On Track</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {improvementAreas.filter(area => area.status === "Needs Attention").length}
                  </div>
                  <div className="text-xs text-darkTeal">Need Attention</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {improvementAreas.filter(area => area.status === "Off Track").length}
                  </div>
                  <div className="text-xs text-darkTeal">Off Track</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Areas for Improvement with Enhanced Progress */}
      {improvementAreas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-darkTeal mb-4">Areas for Improvement</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvementAreas.map((area, index) => (
              <StatusProgress
                key={area.id}
                status={area.status}
                percentage={area.percentage || 0}
                title={area.category}
                description={area.description}
                size="md"
              />
            ))}
          </div>
          
          {/* Detailed Improvement Areas */}
          <div className="mt-6 space-y-4">
            {improvementAreas.map((area, index) => (
              <div key={area.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h5 className="font-semibold text-darkTeal">{area.category}</h5>
                    <p className="text-sm text-darkTeal mt-1">{area.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    area.status === "Needs Attention" 
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}>
                    {area.status}
                  </span>
                </div>
                
                {/* Progress for this specific area */}
                <div className="mb-3">
                  <ProgressBar 
                    percentage={area.percentage || 0}
                    status={area.status}
                    height="h-2"
                    showLabel={false}
                    animated={true}
                  />
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-teal font-medium">Current Status:</span>
                  <p className="text-sm text-darkTeal mt-1">{area.justification}</p>
                </div>
                
                <div className="bg-lightCyan p-3 rounded-lg">
                  <span className="text-xs text-darkTeal font-medium">💡 Recommendation:</span>
                  <p className="text-sm text-darkTeal mt-1">{getRecommendation(area)}</p>
                </div>
                
                {/* Action Items for this area */}
                {area.suggestions && area.suggestions.length > 0 && (
                  <div className="mt-3 bg-veryLightCyan p-3 rounded-lg">
                    <span className="text-xs text-teal font-medium">🎯 Action Items:</span>
                    <ul className="text-xs text-darkTeal mt-2 space-y-1">
                      {area.suggestions.slice(0, 3).map((suggestion, i) => (
                        <li key={i}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Improvement Areas */}
      {improvementAreas.length === 0 && (
        <div className="text-center py-8 bg-green-50 rounded-lg border border-green-200">
          <span className="text-4xl mb-2 block">🌟</span>
          <h4 className="text-lg font-semibold text-green-800 mb-2">Excellent Performance!</h4>
          <p className="text-green-700">All benchmarks are currently on track. Keep up the great work!</p>
          
          {/* Achievement Progress */}
          <div className="mt-4 max-w-md mx-auto">
            <ProgressBar 
              percentage={100}
              status="Excellent"
              label="All Benchmarks Achieved"
              height="h-3"
              animated={true}
            />
          </div>
        </div>
      )}

      {/* Enhanced Action Items Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-darkTeal mb-4">Strategic Focus Areas</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-lightBlueGreen bg-opacity-10 p-4 rounded-lg border border-lightBlueGreen">
            <h5 className="font-semibold text-darkTeal mb-3 flex items-center">
              <TickIcon className="w-5 h-5 mr-2 text-lightBlueGreen" />
              Strengths to Maintain
            </h5>
            <ul className="text-sm text-darkTeal space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-lightBlueGreen rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Strong ESL program delivery exceeding SLNSW standards
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-lightBlueGreen rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Comprehensive LOTE collection (1,247+ items)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-lightBlueGreen rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Effective staff cultural competency training
              </li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h5 className="font-semibold text-darkTeal mb-3 flex items-center">
              <WarningIcon className="w-5 h-5 mr-2 text-yellow-600" />
              Priority Focus Areas
            </h5>
            <ul className="text-sm text-darkTeal space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Increase LOTE collection to 5% of total collection
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Recruit additional multicultural services specialist
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Implement annual community needs assessment
              </li>
            </ul>
          </div>
        </div>
        
        {/* Progress Timeline */}
        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
          <h5 className="font-semibold text-darkTeal mb-3">Implementation Timeline</h5>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 font-bold text-sm">Q1</div>
              <div className="flex-1">
                <ProgressBar 
                  percentage={25}
                  status="Needs Attention"
                  label="Recruit specialist librarian, plan annual survey"
                  height="h-2"
                  showLabel={false}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-teal bg-opacity-20 rounded-full flex items-center justify-center text-teal font-bold text-sm">Q2</div>
              <div className="flex-1">
                <ProgressBar 
                  percentage={50}
                  status="On Track"
                  label="Conduct community survey, expand LOTE collection"
                  height="h-2"
                  showLabel={false}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-lightBlueGreen bg-opacity-20 rounded-full flex items-center justify-center text-lightBlueGreen font-bold text-sm">Q3</div>
              <div className="flex-1">
                <ProgressBar 
                  percentage={75}
                  status="On Track"
                  label="Analyze survey results, implement improvements"
                  height="h-2"
                  showLabel={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkHealth; 