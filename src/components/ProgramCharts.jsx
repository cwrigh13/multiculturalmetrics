import React from 'react';

const ProgramCharts = ({ attendanceByType, attendanceByCommunity, isLoading = false }) => {
  
  // Custom Bar Chart Component using styled divs
  const BarChart = ({ data, title, maxValue, isLoading }) => {
    
    const BarItem = ({ label, value, maxValue, isLoading }) => {
      const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
      const displayValue = value?.toLocaleString() || 0;
      
      return (
        <div className="mb-4">
          {/* Label and Value */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-darkTeal truncate mr-2">
              {label}
            </span>
            <span className="text-sm font-bold text-teal whitespace-nowrap">
              {isLoading ? '...' : displayValue}
            </span>
          </div>
          
          {/* Bar Container */}
          <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
            {/* Animated Bar */}
            {isLoading ? (
              <div className="h-full bg-teal bg-opacity-30 animate-pulse rounded-full"></div>
            ) : (
              <div 
                className="h-full bg-teal rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${percentage}%` }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white to-transparent opacity-20 rounded-full"></div>
              </div>
            )}
            
            {/* Value label inside bar (for larger values) */}
            {!isLoading && percentage > 30 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {displayValue}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    };

    // Convert data object to sorted array for display
    const dataArray = Object.entries(data || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5); // Top 5 only

    const calculatedMaxValue = dataArray.length > 0 ? Math.max(...dataArray.map(([,value]) => value)) : 0;
    const hasData = dataArray.length > 0;

    return (
      <div>
        <h4 className="text-lg font-semibold text-darkTeal mb-4">
          {title}
        </h4>
        
        <div className="bg-veryLightCyan rounded-lg p-6 border border-lightBlueGreen min-h-[300px]">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <BarItem 
                  key={i}
                  label="Loading..."
                  value={0}
                  maxValue={100}
                  isLoading={true}
                />
              ))}
            </div>
          ) : hasData ? (
            <div className="space-y-4">
              {dataArray.map(([label, value], index) => (
                <BarItem
                  key={label}
                  label={label}
                  value={value}
                  maxValue={calculatedMaxValue}
                  isLoading={false}
                />
              ))}
              
              {/* Show message if less than 5 items */}
              {dataArray.length < 5 && (
                <div className="text-center py-4">
                  <p className="text-sm text-teal opacity-75">
                    Showing {dataArray.length} of {dataArray.length} available {title.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-darkTeal font-medium">No data available</p>
                <p className="text-sm text-teal opacity-75 mt-1">
                  Try adjusting your filters to see {title.toLowerCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      
      {/* Section Header */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-darkTeal mb-2">Program Engagement</h3>
        <p className="text-sm text-teal opacity-75">
          Attendance patterns across program types and languages (Top 5 each)
        </p>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Program Types by Attendance */}
        <BarChart
          data={attendanceByType}
          title="Top Program Types by Attendance"
          isLoading={isLoading}
        />
        
        {/* Top Languages Engaged */}
        <BarChart
          data={attendanceByCommunity}
          title="Top Languages Engaged"
          isLoading={isLoading}
        />
        
      </div>
      
      {/* Summary Statistics */}
      {!isLoading && (attendanceByType || attendanceByCommunity) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Program Types Summary */}
          {Object.keys(attendanceByType || {}).length > 0 && (
            <div className="bg-lightCyan rounded-lg p-4 border border-lightBlueGreen">
              <h5 className="font-semibold text-teal mb-2">Program Type Insights</h5>
              <div className="text-sm text-darkTeal">
                <p className="mb-1">
                  <strong>Total types:</strong> {Object.keys(attendanceByType).length}
                </p>
                <p className="mb-1">
                  <strong>Total attendance:</strong> {Object.values(attendanceByType).reduce((sum, val) => sum + val, 0).toLocaleString()}
                </p>
                <p>
                  <strong>Most popular:</strong> {Object.entries(attendanceByType).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </p>
              </div>
            </div>
          )}
          
          {/* Communities Summary */}
          {Object.keys(attendanceByCommunity || {}).length > 0 && (
            <div className="bg-lightCyan rounded-lg p-4 border border-lightBlueGreen">
              <h5 className="font-semibold text-teal mb-2">Language Engagement Insights</h5>
              <div className="text-sm text-darkTeal">
                <p className="mb-1">
                  <strong>Languages served:</strong> {Object.keys(attendanceByCommunity).length}
                </p>
                <p className="mb-1">
                  <strong>Total attendance:</strong> {Object.values(attendanceByCommunity).reduce((sum, val) => sum + val, 0).toLocaleString()}
                </p>
                <p>
                  <strong>Most engaged:</strong> {Object.entries(attendanceByCommunity).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </p>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default ProgramCharts; 