import React from 'react';
import { TickIcon, WarningIcon, ErrorIcon } from './icons';
import { ProgressBar } from './ProgressComponents';
import { RequirementTooltip, HelpTooltip } from './Tooltip';
import BenchmarkHealthSummary from './BenchmarkHealthSummary';

const SLNSWBenchmarks = ({ quantitativeBenchmarks, qualitativeBenchmarks, benchmarkHealth }) => {
  
  // Find the ESL Collection benchmark for prominent display
  const eslBenchmark = quantitativeBenchmarks?.find(b => b.id === "esl-collection");
  
  // Find LOTE Collection benchmarks for grouped display
  const loteBenchmarks = quantitativeBenchmarks?.filter(b => b.id.startsWith("lote-collection")) || [];
  console.log("LOTE Benchmarks found:", loteBenchmarks);
  
  // Find Specialist Staffing benchmark for prominent display
  const specialistStaffingBenchmark = quantitativeBenchmarks?.find(b => b.id === "specialist-staffing");
  
  // Find Research Frequency benchmark for prominent display
  const researchFrequencyBenchmark = quantitativeBenchmarks?.find(b => b.id === "research-frequency");
  
  const StatusBadge = ({ status, size = "sm" }) => {
    const statusColors = {
      "On Track": "bg-lightBlueGreen text-darkTeal border-lightBlueGreen",
      "Needs Attention": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Off Track": "bg-red-100 text-red-800 border-red-200"
    };

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base"
    };

    return (
      <span className={`${sizeClasses[size]} rounded-full font-medium border ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const StatusIcon = ({ status, size = "w-5 h-5" }) => {
    switch (status) {
      case "On Track":
        return <TickIcon className={`${size} text-lightBlueGreen`} />;
      case "Needs Attention":
        return <WarningIcon className={`${size} text-yellow-600`} />;
      case "Off Track":
        return <ErrorIcon className={`${size} text-red-600`} />;
      default:
        return null;
    }
  };



  const ESLCollectionDisplay = ({ benchmark }) => {
    if (!benchmark) return null;

    return (
      <div className="bg-lightCyan rounded-lg p-6 border-2 border-lightBlueGreen mb-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <StatusIcon status={benchmark.status} size="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div>
                <h4 className="text-xl font-bold text-darkTeal">Planning for library services relevant to CALD clients</h4>
                <p className="text-sm text-teal">{benchmark.description}</p>
              </div>
              <HelpTooltip 
                title="ESL Collection Requirements"
                content="English as a Second Language (ESL) collections support new migrants and non-English speakers in developing English language skills. SLNSW requires dedicated ESL materials including graded readers, language learning resources, dictionaries, pronunciation guides, and community information materials. Collections should cater to all proficiency levels from absolute beginner to advanced learners."
                detail="Georges River Libraries maintains 523 ESL items (147% of minimum requirement), providing comprehensive language learning support across beginner, intermediate, and advanced levels."
                size="lg"
              />
            </div>
          </div>
          <StatusBadge status={benchmark.status} size="lg" />
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          
          {/* Target Value */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Target Requirement
              </div>
              <div className="text-lg font-bold text-darkTeal mb-1">
                {benchmark.target}
              </div>
              <div className="text-xs text-teal opacity-75">
                SLNSW Standard
              </div>
            </div>
          </div>

          {/* Actual Value */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Current Provision
              </div>
              <div className="text-lg font-bold text-darkTeal mb-1">
                {benchmark.actual}
              </div>
              <div className="text-xs text-teal opacity-75">
                Georges River Libraries
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Performance Level
              </div>
              <div className="text-lg font-bold text-darkTeal mb-2">
                {benchmark.percentage}%
              </div>
              <ProgressBar 
                percentage={benchmark.percentage} 
                status={benchmark.status}
                showLabel={false}
                height="h-4"
              />
            </div>
          </div>
        </div>

        {/* Justification */}
        <div className="bg-veryLightCyan rounded-lg p-4 border border-lightBlueGreen">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-darkTeal mb-1">Assessment Notes</h5>
              <p className="text-sm text-teal">{benchmark.justification}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LOTECollectionDisplay = ({ benchmarks }) => {
    console.log("LOTECollectionDisplay called with:", benchmarks);
    if (!benchmarks || benchmarks.length === 0) return null;

    // Calculate overall status based on sub-items
    const getOverallStatus = () => {
      const hasOffTrack = benchmarks.some(b => b.status === "Off Track");
      const hasNeedsAttention = benchmarks.some(b => b.status === "Needs Attention");
      
      if (hasOffTrack) return "Off Track";
      if (hasNeedsAttention) return "Needs Attention";
      return "On Track";
    };

    // Calculate overall progress percentage
    const overallProgress = Math.round(
      benchmarks.reduce((sum, b) => sum + (b.percentage || 0), 0) / benchmarks.length
    );

    const overallStatus = getOverallStatus();

    const LOTESubItem = ({ benchmark }) => {
      // Enhanced tooltip content based on subcategory
      const getEnhancedTooltip = () => {
        switch (benchmark.subcategory) {
          case "Minimum Items":
            return {
              title: "Minimum Items Requirement (500+ items)",
              content: "The State Library of NSW mandates that all public libraries maintain a minimum of 500 items in Languages Other Than English (LOTE) to provide basic multicultural services. This baseline ensures that libraries can serve non-English speaking residents with appropriate resources. Items include fiction and non-fiction books, audiobooks, magazines, DVDs, digital resources, and children's materials. The collection should represent the major languages spoken in the community and cover diverse topics including literature, education, health, and community information.",
              detail: "Georges River Libraries currently holds 1,247 LOTE items (249% of minimum requirement), demonstrating strong commitment to multicultural service delivery across Chinese, Arabic, Greek, Spanish, and Nepali languages."
            };
          case "Proportion for Large LGAs":
            return {
              title: "Large LGA Proportion Standard (5% of total collection)",
              content: "Local Government Areas serving populations over 50,000 residents must dedicate at least 5% of their total library collection to Languages Other Than English (LOTE) materials. This proportion ensures adequate representation of multicultural communities in larger diverse areas. The 5% target reflects the higher likelihood of significant multicultural populations in large LGAs and the greater resources available to meet this standard. Collections should be distributed across branch libraries based on local demographic needs.",
              detail: "Current LOTE collection represents 3.8% of total holdings (32,789 items total). To achieve the 5% target, approximately 391 additional LOTE items are needed. Priority expansion areas include children's materials, digital resources, and languages with growing community presence."
            };
          case "Existence for Significant Groups":
            return {
              title: "Significant Community Coverage (2%+ population groups)",
              content: "Libraries must maintain collections for all cultural and linguistic groups that represent 2% or more of the local population. This threshold ensures that substantial community groups have access to materials in their preferred languages. Coverage includes not just books but also culturally relevant media, community information, and materials that support settlement and integration. The 2% threshold is based on Census data and community consultation to identify significant populations requiring dedicated library services.",
              detail: "Georges River area demographics require collections in Chinese (15.2% of population), Arabic (8.7%), Greek (4.1%), Spanish (2.8%), and Nepali (2.3%). All five language groups currently have dedicated collections, achieving 100% compliance with this requirement."
            };
          default:
            return { 
              title: "LOTE Collection Standard", 
              content: benchmark.tooltip || "State Library of NSW benchmark for multicultural library services.", 
              detail: benchmark.justification || "Meeting SLNSW requirements for diverse community service." 
            };
        }
      };

      const tooltipData = getEnhancedTooltip();

      // Success indicator component
      const SuccessIndicator = () => {
        if (benchmark.status === "On Track") {
          return (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-lightBlueGreen rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          );
        }
        return null;
      };

      return (
        <div className="bg-white rounded-lg p-4 border border-lightBlueGreen relative hover:shadow-md transition-all duration-200">
          {/* Success Indicator Badge */}
          <SuccessIndicator />
          
          {/* Sub-item Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <StatusIcon status={benchmark.status} size="w-5 h-5" />
                <h6 className="font-semibold text-sm text-darkTeal">{benchmark.subcategory}</h6>
                {/* Enhanced Requirement Tooltip */}
                <RequirementTooltip 
                  requirement={tooltipData.title}
                  explanation={tooltipData.content}
                  currentStatus={tooltipData.detail}
                  size="xl"
                />
              </div>
              <p className="text-xs text-darkTeal mb-2">{benchmark.description}</p>
              
              {/* Achievement Badge for successful items */}
              {benchmark.status === "On Track" && (
                <div className="inline-flex items-center space-x-1 bg-lightBlueGreen bg-opacity-20 text-lightBlueGreen px-2 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Standard Met</span>
                </div>
              )}
            </div>
            <StatusBadge status={benchmark.status} size="sm" />
          </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <ProgressBar 
            percentage={benchmark.percentage} 
            status={benchmark.status}
            height="h-3"
            showLabel={true}
          />
        </div>

        {/* Target vs Actual */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xs text-teal font-medium mb-1">Target</div>
            <div className="text-sm font-bold text-darkTeal">{benchmark.target}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-teal font-medium mb-1">Actual</div>
            <div className="text-sm font-bold text-darkTeal">{benchmark.actual}</div>
          </div>
        </div>

        {/* Justification */}
        <div className="mt-3 p-2 bg-veryLightCyan rounded text-xs text-teal">
          {benchmark.justification}
        </div>
      </div>
    );
  };

    return (
      <div className="bg-lightCyan rounded-lg p-6 border-2 border-lightBlueGreen mb-6">
        
        {/* Main Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <StatusIcon status={overallStatus} size="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div>
                <h4 className="text-xl font-bold text-darkTeal">LOTE Collection Provision</h4>
                <p className="text-sm text-teal">Languages Other Than English collection benchmarks</p>
              </div>
              <HelpTooltip 
                title="LOTE Collection Standards Overview"
                content="The State Library of NSW requires public libraries to maintain comprehensive Languages Other Than English (LOTE) collections to serve multicultural communities. These standards ensure equitable access to library resources for all residents regardless of their language background."
                detail="Georges River Libraries serves communities speaking Chinese, Arabic, Greek, Spanish, and Nepali among others. Current collection includes 1,247 LOTE items across multiple formats."
                size="xl"
              />
            </div>
          </div>
          <div className="text-right">
            <StatusBadge status={overallStatus} size="lg" />
            <div className="text-xs text-teal mt-1">Overall: {overallProgress}%</div>
          </div>
        </div>

        {/* Overall Progress Summary */}
        <div className="bg-white rounded-lg p-4 border border-lightBlueGreen mb-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold text-darkTeal">Collection Overview</h5>
            <span className="text-sm font-bold text-teal">{overallProgress}% Achievement</span>
          </div>
          <ProgressBar 
            percentage={overallProgress} 
            status={overallStatus}
            height="h-4"
            showLabel={false}
          />
          <div className="mt-2 text-xs text-teal">
            {benchmarks.filter(b => b.status === "On Track").length} of {benchmarks.length} requirements met
          </div>
        </div>

        {/* LOTE Sub-Items */}
        <div>
          <h5 className="font-semibold text-darkTeal mb-4">Collection Requirements</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benchmarks.map((benchmark) => (
              <LOTESubItem key={benchmark.id} benchmark={benchmark} />
            ))}
          </div>
        </div>

        {/* Summary Insights */}
        <div className="mt-6 bg-veryLightCyan rounded-lg p-4 border border-lightBlueGreen">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-darkTeal mb-2">LOTE Collection Summary</h6>
              <div className="text-sm text-teal space-y-1">
                <p>• <strong>Minimum Items:</strong> {benchmarks.find(b => b.subcategory === "Minimum Items")?.actual || "N/A"} (exceeds 500 item requirement)</p>
                <p>• <strong>Collection Proportion:</strong> {benchmarks.find(b => b.subcategory === "Proportion for Large LGAs")?.actual || "N/A"} of total collection</p>
                <p>• <strong>Language Coverage:</strong> {benchmarks.find(b => b.subcategory === "Existence for Significant Groups")?.actual || "N/A"} supported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SpecialistStaffingDisplay = ({ benchmark }) => {
    if (!benchmark) return null;

    // Extract numeric values for calculations
    const targetFTE = parseFloat(benchmark.target.match(/[\d.]+/)?.[0] || "1");
    const actualFTE = parseFloat(benchmark.actual.match(/[\d.]+/)?.[0] || "0.6");
    const staffingGap = targetFTE - actualFTE;
    const gapPercentage = (staffingGap / targetFTE) * 100;

    return (
      <div className="bg-lightCyan rounded-lg p-6 border-2 border-lightBlueGreen mb-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <StatusIcon status={benchmark.status} size="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div>
                <h4 className="text-xl font-bold text-darkTeal">Organisational capacity to develop and deliver multicultural services/collections</h4>
                <p className="text-sm text-teal">{benchmark.description}</p>
              </div>
              <HelpTooltip 
                title="Multicultural Specialist Staffing Standard"
                content="SLNSW requires public libraries in diverse areas to employ at least 1.0 FTE (Full-Time Equivalent) specialist librarian dedicated to multicultural services. This role involves collection development, community outreach, program delivery, cultural competency training, and liaison with multicultural organizations. Specialist staff ensure appropriate service delivery to culturally and linguistically diverse communities."
                detail="Georges River Libraries currently employs 0.6 FTE specialist multicultural librarian. An additional 0.4 FTE position is needed to meet the full-time requirement and adequately serve the diverse community."
                size="xl"
              />
            </div>
          </div>
          <StatusBadge status={benchmark.status} size="lg" />
        </div>

        {/* Staffing Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Target Staffing */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Target Staffing
              </div>
              <div className="text-2xl font-bold text-darkTeal mb-1">
                {benchmark.target}
              </div>
              <div className="text-xs text-teal opacity-75">
                SLNSW Requirement
              </div>
            </div>
          </div>

          {/* Current Staffing */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Current Staffing
              </div>
              <div className="text-2xl font-bold text-darkTeal mb-1">
                {benchmark.actual}
              </div>
              <div className="text-xs text-teal opacity-75">
                Georges River Libraries
              </div>
            </div>
          </div>

          {/* Staffing Gap */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Staffing Gap
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {staffingGap.toFixed(1)} FTE
              </div>
              <div className="text-xs text-red-600 opacity-75">
                {gapPercentage.toFixed(0)}% shortfall
              </div>
            </div>
          </div>
        </div>

        {/* Staffing Progress Visualization */}
        <div className="bg-white rounded-lg p-6 border border-lightBlueGreen mb-6">
          <h5 className="font-semibold text-darkTeal mb-4">Staffing Level Progress</h5>
          
          {/* Main Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-teal">Current vs Target Staffing</span>
              <span className="text-sm font-bold text-darkTeal">{benchmark.percentage}%</span>
            </div>
            <ProgressBar 
              percentage={benchmark.percentage} 
              status={benchmark.status}
              height="h-6"
              showLabel={false}
            />
            <div className="flex justify-between text-xs text-teal mt-1">
              <span>0.0 FTE</span>
              <span className="font-medium">Current: {actualFTE} FTE</span>
              <span>Target: {targetFTE} FTE</span>
            </div>
          </div>

          {/* FTE Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-lightCyan rounded-lg">
              <div className="text-xs font-medium text-teal mb-1">Filled Positions</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-lightBlueGreen rounded-full"></div>
                <span className="text-sm font-bold text-darkTeal">{actualFTE} FTE</span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xs font-medium text-red-700 mb-1">Positions Needed</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-sm font-bold text-red-700">{staffingGap.toFixed(1)} FTE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Staffing Impact Analysis */}
        <div className="bg-white rounded-lg p-6 border border-lightBlueGreen mb-4">
          <h5 className="font-semibold text-darkTeal mb-4">Impact of Current Staffing Level</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Capabilities */}
            <div>
              <h6 className="text-sm font-semibold text-teal mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-lightBlueGreen" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Current Capabilities (0.6 FTE)
              </h6>
              <ul className="text-xs text-darkTeal space-y-1">
                <li>• Basic multicultural program coordination</li>
                <li>• Limited community outreach</li>
                <li>• Collection development support</li>
                <li>• Part-time specialized services</li>
              </ul>
            </div>
            
            {/* With Full Staffing */}
            <div>
              <h6 className="text-sm font-semibold text-teal mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                With Full Staffing (1.0 FTE)
              </h6>
              <ul className="text-xs text-darkTeal space-y-1">
                <li>• Comprehensive multicultural program leadership</li>
                <li>• Enhanced community partnerships</li>
                <li>• Specialized collection development</li>
                <li>• Full-time dedicated expertise</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assessment and Recommendations */}
        <div className="bg-veryLightCyan rounded-lg p-4 border border-lightBlueGreen">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-darkTeal mb-2">Assessment & Recommendations</h6>
              <p className="text-sm text-teal mb-3">{benchmark.justification}</p>
              <div className="bg-white p-3 rounded border border-lightBlueGreen">
                <div className="text-xs font-semibold text-teal mb-2">Priority Actions:</div>
                <ul className="text-xs text-darkTeal space-y-1">
                  <li>• Recruit additional 0.4 FTE multicultural services librarian</li>
                  <li>• Consider temporary contract or job sharing arrangements</li>
                  <li>• Develop succession planning for multicultural expertise</li>
                  <li>• Provide specialized training for existing staff</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResearchFrequencyDisplay = ({ benchmark }) => {
    if (!benchmark) return null;

    // Parse frequency information
    const getFrequencyData = () => {
      const targetFreq = benchmark.target.toLowerCase();
      const actualFreq = benchmark.actual.toLowerCase();
      
      const frequencies = {
        'annual': { value: 12, label: 'Annual', months: 12 },
        'biennial': { value: 6, label: 'Biennial', months: 24 },
        'quarterly': { value: 3, label: 'Quarterly', months: 3 },
        'monthly': { value: 1, label: 'Monthly', months: 1 }
      };

      const targetData = frequencies[targetFreq.replace(' surveys', '')] || { value: 12, label: 'Annual', months: 12 };
      const actualData = frequencies[actualFreq.replace(' surveys', '')] || { value: 6, label: 'Biennial', months: 24 };
      
      const frequencyGap = actualData.months - targetData.months;
      const efficiencyRatio = targetData.months / actualData.months;

      return { targetData, actualData, frequencyGap, efficiencyRatio };
    };

    const { targetData, actualData, frequencyGap, efficiencyRatio } = getFrequencyData();

    return (
      <div className="bg-lightCyan rounded-lg p-6 border-2 border-lightBlueGreen mb-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <StatusIcon status={benchmark.status} size="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div>
                <h4 className="text-xl font-bold text-darkTeal">Formal Audience Research Frequency</h4>
                <p className="text-sm text-teal">{benchmark.description}</p>
              </div>
              <HelpTooltip 
                title="Annual Research Requirements"
                content="SLNSW requires public libraries to conduct formal audience research at least annually to understand community needs, measure service effectiveness, and guide strategic planning. Research methods include community surveys, focus groups, demographic analysis, and usage pattern studies. Annual frequency ensures libraries stay responsive to changing community demographics and emerging needs."
                detail="Georges River Libraries currently conducts research biennially (every 2 years). Moving to annual research would provide more timely insights for program development and service improvements."
                size="lg"
              />
            </div>
          </div>
          <StatusBadge status={benchmark.status} size="lg" />
        </div>

        {/* Research Frequency Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Target Frequency */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Target Frequency
              </div>
              <div className="text-2xl font-bold text-darkTeal mb-1">
                {benchmark.target}
              </div>
              <div className="text-xs text-teal opacity-75">
                SLNSW Standard
              </div>
            </div>
          </div>

          {/* Current Frequency */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Current Frequency
              </div>
              <div className="text-2xl font-bold text-darkTeal mb-1">
                {benchmark.actual}
              </div>
              <div className="text-xs text-teal opacity-75">
                Georges River Libraries
              </div>
            </div>
          </div>

          {/* Frequency Gap */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
            <div className="text-center">
              <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                Frequency Gap
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                +{frequencyGap} months
              </div>
              <div className="text-xs text-red-600 opacity-75">
                Below recommended frequency
              </div>
            </div>
          </div>
        </div>

        {/* Research Timeline Visualization */}
        <div className="bg-white rounded-lg p-6 border border-lightBlueGreen mb-6">
          <h5 className="font-semibold text-darkTeal mb-4">Research Schedule Comparison</h5>
          
          {/* Main Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-teal">Research Frequency Performance</span>
              <span className="text-sm font-bold text-darkTeal">{benchmark.percentage}%</span>
            </div>
            <ProgressBar 
              percentage={benchmark.percentage} 
              status={benchmark.status}
              height="h-6"
              showLabel={false}
            />
            <div className="flex justify-between text-xs text-teal mt-2">
              <span>Infrequent</span>
              <span className="font-medium">Current: {actualData.label}</span>
              <span>Target: {targetData.label}</span>
            </div>
          </div>

          {/* Timeline Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Schedule */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h6 className="text-sm font-semibold text-yellow-800 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Current: {actualData.label}
              </h6>
              <div className="text-xs text-yellow-800 space-y-1">
                <p>• Research conducted every {actualData.months} months</p>
                <p>• Less frequent community feedback</p>
                <p>• Potential service gaps between assessments</p>
                <p>• Slower response to changing needs</p>
              </div>
            </div>
            
            {/* Target Schedule */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h6 className="text-sm font-semibold text-green-800 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Target: {targetData.label}
              </h6>
              <div className="text-xs text-green-800 space-y-1">
                <p>• Research conducted every {targetData.months} months</p>
                <p>• Regular community pulse checks</p>
                <p>• Proactive service adjustments</p>
                <p>• Responsive to community changes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Impact Analysis */}
        <div className="bg-white rounded-lg p-6 border border-lightBlueGreen mb-4">
          <h5 className="font-semibold text-darkTeal mb-4">Impact of Research Frequency</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Data Currency */}
            <div className="text-center p-3 bg-veryLightCyan rounded-lg">
              <div className="text-lg font-bold text-darkTeal mb-1">24 months</div>
              <div className="text-xs text-teal">Data Age (Current)</div>
            </div>
            
            {/* Recommended Age */}
            <div className="text-center p-3 bg-lightBlueGreen bg-opacity-20 rounded-lg">
              <div className="text-lg font-bold text-darkTeal mb-1">12 months</div>
              <div className="text-xs text-teal">Recommended Max Age</div>
            </div>
            
            {/* Improvement Potential */}
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700 mb-1">2x</div>
              <div className="text-xs text-green-700">Frequency Improvement</div>
            </div>
          </div>

          {/* Research Benefits Timeline */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm text-darkTeal">
                <strong>Annual Research Benefits:</strong> Up-to-date community needs assessment, responsive service planning, improved benchmark tracking
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm text-darkTeal">
                <strong>Current Biennial Gaps:</strong> Potential service misalignment, delayed response to demographic changes, outdated program priorities
              </div>
            </div>
          </div>
        </div>

        {/* Assessment and Implementation Plan */}
        <div className="bg-veryLightCyan rounded-lg p-4 border border-lightBlueGreen">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-darkTeal mb-2">Assessment & Implementation Plan</h6>
              <p className="text-sm text-teal mb-3">{benchmark.justification}</p>
              <div className="bg-white p-3 rounded border border-lightBlueGreen">
                <div className="text-xs font-semibold text-teal mb-2">Next Steps for Annual Research:</div>
                <ul className="text-xs text-darkTeal space-y-1">
                  <li>• Schedule annual community needs assessment survey</li>
                  <li>• Implement quarterly pulse surveys for ongoing feedback</li>
                  <li>• Establish focus groups with community leaders</li>
                  <li>• Develop partnerships with community organizations for feedback</li>
                  <li>• Use digital platforms for continuous consultation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BenchmarkCard = ({ benchmark }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <StatusIcon status={benchmark.status} size="w-4 h-4" />
            <h5 className="font-semibold text-sm text-darkTeal">{benchmark.category}</h5>
          </div>
          {benchmark.subcategory && (
            <p className="text-xs text-teal font-medium mb-1">{benchmark.subcategory}</p>
          )}
          <p className="text-xs text-darkTeal">{benchmark.description}</p>
        </div>
        <StatusBadge status={benchmark.status} size="sm" />
      </div>
      
      {/* Progress Bar */}
      {benchmark.percentage !== undefined && (
        <div className="mb-3">
          <ProgressBar 
            percentage={benchmark.percentage} 
            status={benchmark.status}
            height="h-2"
          />
        </div>
      )}
      
      {/* Values Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-teal font-medium">Target:</span>
          <p className="text-darkTeal">{benchmark.target}</p>
        </div>
        <div>
          <span className="text-teal font-medium">Actual:</span>
          <p className="text-darkTeal">{benchmark.actual}</p>
        </div>
      </div>
      
      {/* Tooltip for special cases */}
      {benchmark.tooltip && (
        <div className="mt-2 text-xs text-teal opacity-75 italic">
          💡 {benchmark.tooltip}
        </div>
      )}
    </div>
  );

  const QualitativeBenchmarksDisplay = ({ benchmarks }) => {
    if (!benchmarks || benchmarks.length === 0) return null;

    // Calculate overall qualitative status
    const getOverallStatus = () => {
      const hasOffTrack = benchmarks.some(b => b.status === "Off Track");
      const hasNeedsAttention = benchmarks.some(b => b.status === "Needs Attention");
      
      if (hasOffTrack) return "Off Track";
      if (hasNeedsAttention) return "Needs Attention";
      return "On Track";
    };

    const overallStatus = getOverallStatus();
    const onTrackCount = benchmarks.filter(b => b.status === "On Track").length;

    const QualitativeCard = ({ benchmark }) => {
      // Get specific tooltip content based on benchmark type
      const getTooltipContent = () => {
        switch (benchmark.id) {
          case "feedback-mechanisms":
            return {
              title: "Community Feedback Systems",
              content: "SLNSW requires libraries to establish systematic mechanisms for collecting and analyzing community feedback to ensure services meet local needs. This includes formal surveys, focus groups, suggestion systems, and digital feedback platforms. Feedback should be collected regularly, analyzed systematically, and used to inform service improvements and strategic planning.",
              detail: "Georges River Libraries operates digital feedback systems with 78% response rate, quarterly analysis, and post-program surveys available in multiple languages."
            };
          case "staff-cultural-competency":
            return {
              title: "Cultural Competency Training Requirements",
              content: "All library staff must receive regular cultural competency training to ensure appropriate service delivery to culturally and linguistically diverse communities. Training covers cultural awareness, anti-bias practices, communication strategies, and specific knowledge about local community groups. Annual updates ensure staff stay current with best practices and emerging community needs.",
              detail: "All Georges River Libraries staff completed cultural competency training in 2024, with specialized CALD services training for key personnel and ongoing professional development."
            };
          default:
            return {
              title: benchmark.category,
              content: benchmark.description,
              detail: benchmark.justification
            };
        }
      };

      const tooltipData = getTooltipContent();

      return (
        <div className="bg-lightCyan rounded-lg p-6 border-2 border-lightBlueGreen hover:shadow-lg transition-all duration-300">
          
          {/* Header with Success Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <StatusIcon status={benchmark.status} size="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div>
                  <h5 className="text-lg font-bold text-darkTeal">{benchmark.category}</h5>
                  <p className="text-sm text-teal">{benchmark.description}</p>
                </div>
                <RequirementTooltip 
                  requirement={tooltipData.title}
                  explanation={tooltipData.content}
                  currentStatus={tooltipData.detail}
                  size="xl"
                />
              </div>
            </div>
            
            {/* Status Badge with Achievement Icon */}
            <div className="flex items-center space-x-2">
              {benchmark.status === "On Track" && (
                <div className="w-5 h-5 bg-lightBlueGreen rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <StatusBadge status={benchmark.status} size="lg" />
            </div>
          </div>

          {/* Status Description */}
          <div className="bg-white rounded-lg p-4 border border-lightBlueGreen mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-lightBlueGreen rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h6 className="text-sm font-semibold text-darkTeal mb-2">Current Implementation</h6>
                <p className="text-sm text-darkTeal leading-relaxed">{benchmark.justification}</p>
              </div>
            </div>
          </div>

          {/* Evidence Section */}
          {benchmark.evidence && (
            <div className="bg-white rounded-lg p-4 border border-lightBlueGreen">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 000 2h8a1 1 0 100-2H6zm0 3a1 1 0 000 2h4a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h6 className="text-sm font-semibold text-darkTeal mb-2">Supporting Evidence</h6>
                  <p className="text-sm text-darkTeal leading-relaxed">{benchmark.evidence}</p>
                </div>
              </div>
            </div>
          )}

          {/* Best Practice Indicator */}
          {benchmark.status === "On Track" && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-green-800">Meeting SLNSW Best Practice Standards</span>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="bg-lightCyan rounded-lg p-6 border-2 border-lightBlueGreen mb-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <StatusIcon status={overallStatus} size="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div>
                <h4 className="text-xl font-bold text-darkTeal">Qualitative Benchmarks</h4>
                <p className="text-sm text-teal">Service quality and process effectiveness standards</p>
              </div>
              <HelpTooltip 
                title="Qualitative Benchmark Standards"
                content="SLNSW qualitative benchmarks assess the quality and effectiveness of library processes and services. These standards focus on how well libraries engage with communities, train staff, and maintain service quality rather than quantitative measures. Success is measured through evidence of implementation, community satisfaction, and ongoing improvement."
                detail="Georges River Libraries demonstrates excellence in both feedback mechanisms and staff cultural competency, meeting all qualitative SLNSW requirements."
                size="xl"
              />
            </div>
          </div>
          <div className="text-right">
            <StatusBadge status={overallStatus} size="lg" />
            <div className="text-xs text-teal mt-1">
              {onTrackCount} of {benchmarks.length} standards met
            </div>
          </div>
        </div>

        {/* Overall Performance Summary */}
        <div className="bg-white rounded-lg p-4 border border-lightBlueGreen mb-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold text-darkTeal">Qualitative Performance Overview</h5>
            <span className="text-sm font-bold text-lightBlueGreen">
              {Math.round((onTrackCount / benchmarks.length) * 100)}% Achievement Rate
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-lightBlueGreen bg-opacity-10 rounded-lg">
              <div className="text-2xl font-bold text-lightBlueGreen">{onTrackCount}</div>
              <div className="text-xs text-darkTeal">Standards Met</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {benchmarks.filter(b => b.status === "Needs Attention").length}
              </div>
              <div className="text-xs text-darkTeal">Need Attention</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {benchmarks.filter(b => b.status === "Off Track").length}
              </div>
              <div className="text-xs text-darkTeal">Off Track</div>
            </div>
          </div>
        </div>

        {/* Individual Qualitative Benchmarks */}
        <div className="space-y-6">
          {benchmarks.map((benchmark) => (
            <QualitativeCard key={benchmark.id} benchmark={benchmark} />
          ))}
        </div>

        {/* Success Summary */}
        {onTrackCount === benchmarks.length && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h6 className="text-lg font-semibold text-green-800 mb-1">
                  Excellent Qualitative Performance
                </h6>
                <p className="text-sm text-green-700">
                  All SLNSW qualitative benchmarks achieved. Georges River Libraries demonstrates 
                  best practice in community feedback collection and staff cultural competency development.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      
      <div className="mb-8 text-center">
      </div>

      {/* Benchmark Health Summary */}
      <BenchmarkHealthSummary 
        benchmarkHealth={benchmarkHealth}
        quantitativeBenchmarks={quantitativeBenchmarks}
        qualitativeBenchmarks={qualitativeBenchmarks}
      />

      {/* ESL Collection Display */}
      <ESLCollectionDisplay benchmark={eslBenchmark} />
      
      {/* Specialist Staffing Display */}
      <SpecialistStaffingDisplay benchmark={specialistStaffingBenchmark} />
      
      {/* Research Frequency Display */}
      <ResearchFrequencyDisplay benchmark={researchFrequencyBenchmark} />
      
      {/* Qualitative Benchmarks Display */}
      <QualitativeBenchmarksDisplay benchmarks={qualitativeBenchmarks} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Other Quantitative Benchmarks */}
        <div>
          <h4 className="text-lg font-semibold text-darkTeal mb-4">Other Quantitative Benchmarks</h4>
          
          {/* LOTE Collection Display */}
          <LOTECollectionDisplay benchmarks={loteBenchmarks} />
          
          <div className="space-y-4">
            {quantitativeBenchmarks
              ?.filter(b => b.id !== "esl-collection" && !b.id.startsWith("lote-collection") && b.id !== "specialist-staffing" && b.id !== "research-frequency")
              .map((benchmark) => (
                <BenchmarkCard key={benchmark.id} benchmark={benchmark} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLNSWBenchmarks; 