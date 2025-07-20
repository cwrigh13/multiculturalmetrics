import React from 'react';

const CollectionSummaries = ({ stats, isLoading = false }) => {
  
  const StatCard = ({ title, value, subtitle, icon, isPercentage = false }) => {
    const displayValue = isLoading ? '...' : (value || 0);
    const formattedValue = isPercentage ? `${displayValue}%` : displayValue.toLocaleString();
    
    return (
      <div className="bg-lightCyan rounded-lg p-6 text-center shadow-sm border border-lightBlueGreen hover:shadow-md transition-shadow duration-200">
        {/* Icon */}
        {icon && (
          <div className="flex justify-center mb-3">
            <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        
        {/* Title */}
        <h4 className="text-sm font-semibold text-teal mb-2 uppercase tracking-wide">
          {title}
        </h4>
        
        {/* Value */}
        <div className="mb-2">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-teal bg-opacity-20 rounded mx-auto w-20"></div>
            </div>
          ) : (
            <p className="text-4xl font-bold text-teal">
              {formattedValue}
            </p>
          )}
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-teal opacity-75">
            {subtitle}
          </p>
        )}
      </div>
    );
  };

  // Icons for each metric
  const BooksIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
  );

  const LanguagesIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );

  const GrowthIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );

  const UtilizationIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="mb-6">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Multilingual Collection Items */}
        <StatCard
          title="Total Multilingual Items"
          value={stats.totalMultilingualItems || 0}
          subtitle="LOTE materials in collection"
          icon={<BooksIcon />}
        />
        
        {/* Languages Represented */}
        <StatCard
          title="Languages Represented"
          value={stats.languagesRepresented || 0}
          subtitle="Different languages available"
          icon={<LanguagesIcon />}
        />
        
        {/* Collection Growth Rate */}
        <StatCard
          title="Collection Growth Rate"
          value={stats.collectionGrowthRate || 0}
          subtitle="New items added this period"
          icon={<GrowthIcon />}
          isPercentage={true}
        />
        
        {/* Collection Utilization Rate */}
        <StatCard
          title="Collection Utilization Rate"
          value={stats.collectionUtilizationRate || 0}
          subtitle="Items borrowed vs available"
          icon={<UtilizationIcon />}
          isPercentage={true}
        />
        
      </div>
      
      {/* Additional Context for Filtered Data */}
      {!isLoading && stats.totalCollections !== undefined && (
        <div className="mt-4 p-4 bg-veryLightCyan rounded-lg border border-lightBlueGreen">
          <div className="flex justify-between items-center text-sm text-teal">
            <span>
              <strong>Collections in scope:</strong> {stats.totalCollections || 0}
            </span>
            {stats.averageLoansPerItem !== undefined && (
              <span>
                <strong>Average loans per item:</strong> {stats.averageLoansPerItem}
              </span>
            )}
            {stats.topLanguages !== undefined && (
              <span>
                <strong>Top languages:</strong> {stats.topLanguages}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionSummaries; 