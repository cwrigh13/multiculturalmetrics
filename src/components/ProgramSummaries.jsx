import React from 'react';

const ProgramSummaries = ({ stats, isLoading = false }) => {
  
  const StatCard = ({ title, value, subtitle, icon, isPercentage = false }) => {
    const displayValue = isLoading ? '...' : (value || 0);
    const formattedValue = isPercentage ? `${displayValue}%` : displayValue.toLocaleString();
    
    return (
      <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-black hover:bg-veryLightCyan hover:shadow-md transition-all duration-200">
        {/* Title */}
        <h4 className="text-sm font-semibold text-green-800 mb-2 uppercase tracking-wide">
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
          <p className="text-xs text-green-800 opacity-75">
            {subtitle}
          </p>
        )}
      </div>
    );
  };

  // Icons for each metric
  const AttendeeIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const MembersIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
    </svg>
  );

  const BooksIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
  );

  const TrainingIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="mb-6">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total CALD Program Attendees */}
        <StatCard
          title="Total CALD Program Attendees"
          value={stats.totalCALDAttendees}
          subtitle="Across all programs"
        />
        
        {/* New CALD Members */}
        <StatCard
          title="New CALD Members"
          value={stats.newCALDMembers}
          subtitle={!isLoading && stats.totalCALDAttendees > 0 ? 
            `${Math.round((stats.newCALDMembers / stats.totalCALDAttendees) * 100)}% conversion rate` : 
            'Library memberships'
          }
        />
        
        {/* Multilingual Collection Loans */}
        <StatCard
          title="Multilingual Collection Loans"
          value={stats.multilingualCollectionLoans}
          subtitle="LOTE materials borrowed"
        />
        
        {/* Staff Cultural Training Completion */}
        <StatCard
          title="Staff Cultural Training Completion"
          value={stats.staffCulturalTrainingCompletion}
          subtitle="All staff completed"
          isPercentage={true}
        />
        
      </div>
      
    </div>
  );
};

export default ProgramSummaries; 