import React from 'react';
import { 
  ProgressBar, 
  ProgressGauge, 
  MultiProgressBar, 
  StatusProgress,
  BenchmarkDashboard 
} from './ProgressComponents';

const ProgressDemo = () => {
  // Sample data for demonstration
  const sampleBenchmarks = [
    { id: 1, status: "On Track", percentage: 85 },
    { id: 2, status: "On Track", percentage: 92 },
    { id: 3, status: "Needs Attention", percentage: 65 },
    { id: 4, status: "On Track", percentage: 88 },
    { id: 5, status: "Off Track", percentage: 35 },
    { id: 6, status: "Needs Attention", percentage: 58 },
    { id: 7, status: "On Track", percentage: 95 }
  ];

  const sampleSegments = [
    { label: "ESL Programs", value: 12, status: "On Track" },
    { label: "LOTE Collection", value: 8, status: "Needs Attention" },
    { label: "Research Frequency", value: 3, status: "Off Track" },
    { label: "Staff Training", value: 15, status: "Excellent" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-darkTeal mb-2">
          Reusable Progress Components Demo
        </h1>
        <p className="text-teal">
          Showcase of color-coded status indicators with animated progress bars and gauges
        </p>
      </div>

      {/* Progress Bar Variations */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-darkTeal mb-6">Enhanced Progress Bars</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-darkTeal">Different Status Types</h3>
            
            <ProgressBar 
              percentage={95}
              status="Excellent"
              label="ESL Collection Provision"
              height="h-4"
              animated={true}
            />
            
            <ProgressBar 
              percentage={85}
              status="On Track"
              label="Cultural Competency Training"
              height="h-4"
              animated={true}
            />
            
            <ProgressBar 
              percentage={65}
              status="Needs Attention"
              label="LOTE Collection Proportion"
              height="h-4"
              animated={true}
            />
            
            <ProgressBar 
              percentage={35}
              status="Off Track"
              label="Research Frequency"
              height="h-4"
              animated={true}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-darkTeal">Different Heights & Styles</h3>
            
            <ProgressBar 
              percentage={78}
              status="On Track"
              label="Thin Progress Bar"
              height="h-2"
              animated={true}
            />
            
            <ProgressBar 
              percentage={92}
              status="Excellent"
              label="Medium Progress Bar"
              height="h-4"
              animated={true}
            />
            
            <ProgressBar 
              percentage={66}
              status="Needs Attention"
              label="Thick Progress Bar"
              height="h-6"
              animated={true}
            />
            
            <ProgressBar 
              percentage={45}
              status="Off Track"
              label="No Label Inside"
              height="h-3"
              showLabel={false}
              animated={true}
            />
          </div>
        </div>
      </section>

      {/* Progress Gauges */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-darkTeal mb-6">Circular Progress Gauges</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <ProgressGauge 
            percentage={95}
            status="Excellent"
            size="w-24 h-24"
            strokeWidth={6}
            label="Excellent Performance"
            animated={true}
          />
          
          <ProgressGauge 
            percentage={85}
            status="On Track"
            size="w-24 h-24"
            strokeWidth={6}
            label="On Track"
            animated={true}
          />
          
          <ProgressGauge 
            percentage={65}
            status="Needs Attention"
            size="w-24 h-24"
            strokeWidth={6}
            label="Needs Attention"
            animated={true}
          />
          
          <ProgressGauge 
            percentage={35}
            status="Off Track"
            size="w-24 h-24"
            strokeWidth={6}
            label="Off Track"
            animated={true}
          />
        </div>
        
        {/* Large Gauge Example */}
        <div className="mt-8 text-center">
          <h3 className="font-medium text-darkTeal mb-4">Large Overall Score</h3>
          <ProgressGauge 
            percentage={76}
            status="On Track"
            size="w-40 h-40"
            strokeWidth={8}
            label="Overall Benchmark Health"
            animated={true}
          />
        </div>
      </section>

      {/* Multi-Segment Progress Bars */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-darkTeal mb-6">Multi-Segment Progress Bars</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-darkTeal mb-3">Benchmark Distribution</h3>
            <MultiProgressBar 
              segments={sampleSegments}
              height="h-8"
              showLabels={true}
              animated={true}
            />
          </div>
          
          <div>
            <h3 className="font-medium text-darkTeal mb-3">Performance Categories</h3>
            <MultiProgressBar 
              segments={[
                { label: "On Track", value: 5, status: "On Track" },
                { label: "Needs Attention", value: 2, status: "Needs Attention" },
                { label: "Off Track", value: 1, status: "Off Track" }
              ]}
              height="h-6"
              showLabels={true}
              animated={true}
            />
          </div>
        </div>
      </section>

      {/* Status Progress Cards */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-darkTeal mb-6">Status Progress Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusProgress
            status="Excellent"
            percentage={95}
            title="ESL Collection"
            description="Exceeding SLNSW standards"
            size="md"
          />
          
          <StatusProgress
            status="On Track"
            percentage={85}
            title="Staff Training"
            description="Meeting cultural competency goals"
            size="md"
          />
          
          <StatusProgress
            status="Needs Attention"
            percentage={65}
            title="LOTE Materials"
            description="Below 5% collection target"
            size="md"
          />
          
          <StatusProgress
            status="Off Track"
            percentage={35}
            title="Research Frequency"
            description="Biennial vs annual target"
            size="md"
          />
        </div>
      </section>

      {/* Benchmark Dashboard */}
      <section>
        <h2 className="text-xl font-semibold text-darkTeal mb-6">Complete Benchmark Dashboard</h2>
        <BenchmarkDashboard benchmarks={sampleBenchmarks} />
      </section>

      {/* Implementation Examples */}
      <section className="bg-lightCyan rounded-lg border border-lightBlueGreen p-6">
        <h2 className="text-xl font-semibold text-darkTeal mb-4">Implementation Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-lightBlueGreen">
            <h3 className="font-medium text-darkTeal mb-3">Basic Usage</h3>
            <pre className="text-xs text-teal bg-gray-50 p-3 rounded overflow-x-auto">
{`<ProgressBar 
  percentage={85}
  status="On Track"
  label="Benchmark Progress"
  height="h-4"
  animated={true}
/>`}
            </pre>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-lightBlueGreen">
            <h3 className="font-medium text-darkTeal mb-3">Gauge Usage</h3>
            <pre className="text-xs text-teal bg-gray-50 p-3 rounded overflow-x-auto">
{`<ProgressGauge 
  percentage={75}
  status="On Track"
  size="w-32 h-32"
  label="Overall Score"
  animated={true}
/>`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg border border-lightBlueGreen">
          <h3 className="font-medium text-darkTeal mb-3">Available Status Types</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm border border-green-200">
              "Excellent" - 90%+ (Green)
            </span>
            <span className="px-3 py-1 bg-lightBlueGreen bg-opacity-20 text-lightBlueGreen rounded-full text-sm border border-lightBlueGreen">
              "On Track" - 75%+ (Teal)
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm border border-yellow-200">
              "Needs Attention" - 50%+ (Yellow)
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200">
              "Off Track" - Below 50% (Red)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressDemo; 