import { useState, useEffect } from 'react';
import { 
  programData, 
  communities, 
  suburbs, 
  timePeriods, 
  slnswBenchmarks,
  suggestionsMap,
  getFilteredDashboardData,
  calculateBenchmarkHealth,
  getImprovementAreas
} from './data';
import ProgramFilters from './components/ProgramFilters';
import ProgramSummaries from './components/ProgramSummaries';
import CollectionSummaries from './components/CollectionSummaries';
import SLNSWBenchmarks from './components/SLNSWBenchmarks';
import BenchmarkHealth from './components/BenchmarkHealth';
import ImprovementSuggestions from './components/ImprovementSuggestions';
import AskAI from './components/AskAI';
import './App.css';

function App() {
  console.log('App component is mounting...'); // Debug log
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // === FILTER STATE MANAGEMENT ===
  const [filters, setFilters] = useState({
    community: "All",
    suburb: "All",
    timePeriod: "ytd",
    section: "All",
    collection: "All"
  });

  // === FILTERED DATA STATE MANAGEMENT ===
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalCALDAttendees: 0,
    newCALDMembers: 0,
    multilingualCollectionLoans: 0,
    staffCulturalTrainingCompletion: 0
  });
  const [benchmarkHealth, setBenchmarkHealth] = useState({
    percentage: 0,
    healthMessage: "",
    healthStatus: "",
    onTrackCount: 0,
    totalCount: 0
  });
  const [improvementAreas, setImprovementAreas] = useState([]);

  // === SECTIONS DATA ===
  const sections = [
    { value: "All", label: "All Sections" },
    { value: "key-metrics", label: "Key Metrics" },
    { value: "slnsw-benchmarks", label: "SLNSW Multicultural Benchmarks" },
    { value: "benchmark-health", label: "Benchmark Health Overview" },
    { value: "improvement-areas", label: "Priority Improvement Areas" },
    { value: "ama", label: "AMA" }
  ];

  // === AI RESPONSE STATE MANAGEMENT ===
  const [aiResponse, setAiResponse] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiError, setAiError] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // === FILTER HANDLERS ===
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      community: "All",
      suburb: "All", 
      timePeriod: "ytd",
      section: "All",
      collection: "All"
    });
  };

  // === SECTION VISIBILITY LOGIC ===
  const shouldShowSection = (sectionId) => {
    if (filters.section === "All") return true;
    return filters.section === sectionId;
  };

  // === AI HANDLERS ===
  const handleAIQuery = async (query) => {
    setIsLoadingAI(true);
    setAiError("");
    setAiQuery(query);
    
    try {
      // For now, just simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAiResponse("This is a simulated AI response. The actual AI integration would provide insights based on your data.");
    } catch (error) {
      console.error('AI query error:', error);
      setAiError("Sorry, I'm unable to process your question right now.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const clearAIResponse = () => {
    setAiResponse("");
    setAiQuery("");
    setAiError("");
  };

  useEffect(() => {
    console.log('App useEffect running...');
    
    const loadData = async () => {
      try {
        console.log('Loading data...');
        
        // Load initial data with default filters
        const dashboardData = getFilteredDashboardData(filters);
        
        setFilteredPrograms(dashboardData.filteredPrograms);
        setSummaryStats(dashboardData.summaryStats);
        setBenchmarkHealth(dashboardData.benchmarkHealth);
        setImprovementAreas(dashboardData.improvementAreas);
        
        console.log('Data loaded successfully:', {
          programs: dashboardData.filteredPrograms.length,
          stats: dashboardData.summaryStats
        });
        
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Error loading data: ' + error.message);
      } finally {
        setIsLoading(false);
        console.log('Loading complete');
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-lightestGrey font-work-sans flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-darkTeal mb-4">Dashboard Error</h1>
          <p className="text-darkTeal mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-lightBlueGreen text-white rounded-lg hover:bg-teal mx-auto block"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-lightestGrey font-work-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkTeal mx-auto mb-4"></div>
          <p className="text-darkTeal font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering main dashboard...'); // Debug log

  return (
    <div className="App min-h-screen bg-gray-50 font-work-sans">
      {/* Application Header */}
      <header className="app-header">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center">
            Georges River Libraries
          </h1>
          <p className="subtitle">
            Multicultural Metrics Dashboard - SLNSW Benchmark Tracking
          </p>
        </div>
      </header>

      {/* Main Application Container */}
      <main className="app-container">
        {/* Program Filters Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProgramFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            communities={communities}
            suburbs={suburbs}
            timePeriods={timePeriods}
            sections={sections}
            isLoading={false}
          />
        </div>

        {/* Collection Performance Summary Section */}
        {shouldShowSection("key-metrics") && (
          <section className="dashboard-section animate-fade-in">
            <h2 className="section-title">
              Collection Performance Summary
            </h2>
            <CollectionSummaries 
              stats={summaryStats}
              isLoading={isLoading}
            />
          </section>
        )}

        {/* Program Summary Section */}
        {shouldShowSection("key-metrics") && (
          <section className="dashboard-section animate-fade-in">
            <h2 className="section-title">
              <svg className="w-4 h-4 inline-block mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Programs Summary
            </h2>
            <ProgramSummaries 
              stats={summaryStats}
              isLoading={isLoading}
            />
          </section>
        )}

        {/* SLNSW Benchmarks Section */}
        {shouldShowSection("slnsw-benchmarks") && (
          <section className="dashboard-section animate-fade-in">
            <h2 className="section-title">
              <svg className="w-4 h-4 inline-block mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              SLNSW Multicultural Benchmarks
            </h2>
            <SLNSWBenchmarks 
              quantitativeBenchmarks={slnswBenchmarks.quantitative}
              qualitativeBenchmarks={slnswBenchmarks.qualitative}
              benchmarkHealth={benchmarkHealth}
            />
          </section>
        )}

        {/* Benchmark Health Summary Section */}
        {shouldShowSection("benchmark-health") && (
          <section className="dashboard-section animate-fade-in">
            <h2 className="section-title">
              <svg className="w-4 h-4 inline-block mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Benchmark Health Overview
            </h2>
            <BenchmarkHealth 
              benchmarkHealth={benchmarkHealth}
              improvementAreas={improvementAreas}
            />
          </section>
        )}

        {/* Improvement Suggestions Section */}
        {shouldShowSection("improvement-areas") && (
          <section className="dashboard-section animate-fade-in">
            <h2 className="section-title">
              <svg className="w-4 h-4 inline-block mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Priority Improvement Areas
            </h2>
            <ImprovementSuggestions 
              improvementAreas={improvementAreas}
              suggestionsMap={suggestionsMap}
            />
          </section>
        )}

        {/* AI Assistant Section */}
        {shouldShowSection("ama") && (
          <section className="dashboard-section animate-fade-in">
            <h2 className="section-title">
              <svg className="w-4 h-4 inline-block mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              AI-Powered Insights & Recommendations
            </h2>
            <AskAI
              onQuery={handleAIQuery}
              response={aiResponse}
              query={aiQuery}
              error={aiError}
              isLoading={isLoadingAI}
              onClear={clearAIResponse}
            />
          </section>
        )}
      </main>


    </div>
  );
}

export default App;
