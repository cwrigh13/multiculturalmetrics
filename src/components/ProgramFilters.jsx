import React from 'react';

const ProgramFilters = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  communities, 
  suburbs, 
  timePeriods, 
  sections,
  isLoading = false 
}) => {
  
  const FilterButton = ({ isActive, onClick, children, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border-2 ${
        isActive
          ? 'bg-teal text-white border-teal shadow-md'
          : disabled || isLoading
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
          : 'bg-white text-green-800 border-green-800 hover:bg-veryLightCyan hover:border-teal hover:shadow-sm'
      }`}
    >
      {children}
    </button>
  );

  // Check if Key Metrics section is selected
  const isKeyMetricsSelected = filters.section === "key-metrics";

  return (
    <>
      {/* Section Filter - Always visible */}
      <h4 className="text-sm font-semibold text-darkTeal mb-3 tracking-wide uppercase text-center">
        Section
      </h4>
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {sections.map((section) => (
          <FilterButton
            key={section.value}
            isActive={filters.section === section.value}
            onClick={() => onFilterChange('section', section.value)}
          >
            {section.label}
          </FilterButton>
        ))}
      </div>

      {/* Language Filter - Only show when Key Metrics is selected */}
      {isKeyMetricsSelected && (
        <>
          <h4 className="text-sm font-semibold text-darkTeal mb-3 tracking-wide uppercase text-center">
            Language
          </h4>
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {communities.map((community) => (
              <FilterButton
                key={community}
                isActive={filters.community === community}
                onClick={() => onFilterChange('community', community)}
              >
                {community}
              </FilterButton>
            ))}
          </div>
        </>
      )}

      {/* Branch Filter - Only show when Key Metrics is selected */}
      {isKeyMetricsSelected && (
        <>
          <h4 className="text-sm font-semibold text-darkTeal mb-3 tracking-wide uppercase text-center">
            Branch
          </h4>
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {suburbs.map((suburb) => (
              <FilterButton
                key={suburb}
                isActive={filters.suburb === suburb}
                onClick={() => onFilterChange('suburb', suburb)}
              >
                {suburb}
              </FilterButton>
            ))}
          </div>
          {filters.community === "Chinese" && (
            <p className="text-xs text-gray-500 mb-6 italic">
              * South Hurstville and Oatley programs not available for Chinese language
            </p>
          )}
        </>
      )}

      {/* Time Period Filter - Only show when Key Metrics is selected */}
      {isKeyMetricsSelected && (
        <>
          <h4 className="text-sm font-semibold text-darkTeal mb-3 tracking-wide uppercase text-center">
            Time Period
          </h4>
          <div className="flex flex-wrap gap-2 mb-0 justify-center">
            {timePeriods.map((period) => (
              <FilterButton
                key={period.value}
                isActive={filters.timePeriod === period.value}
                onClick={() => onFilterChange('timePeriod', period.value)}
              >
                {period.label}
              </FilterButton>
            ))}
          </div>
        </>
      )}

      {/* Loading State Indicator */}
      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal mr-2"></div>
          <span className="text-sm text-gray-600">Filtering data...</span>
        </div>
      )}
    </>
  );
};

export default ProgramFilters; 