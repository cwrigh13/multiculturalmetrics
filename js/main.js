// Entry module: loads and validates the data, then hands it to each module.

import { loadAll } from './load.js';
import { renderAnalytics, renderAnalyticsFailure } from './analytics.js';
import { renderBenchmark, renderBenchmarkFailure } from './benchmark.js';

const benchmarkRegion = document.getElementById('benchmark');
const analyticsRegion = document.getElementById('analytics');

try {
  const { programs, benchmarks, errors } = await loadAll();
  renderBenchmark(benchmarkRegion, benchmarks, errors.filter((e) => e.file === 'benchmarks.csv'));
  renderAnalytics(analyticsRegion, programs, errors.filter((e) => e.file === 'programs.csv'));
} catch (err) {
  renderBenchmarkFailure(benchmarkRegion, err.message);
  renderAnalyticsFailure(analyticsRegion, err.message);
}
