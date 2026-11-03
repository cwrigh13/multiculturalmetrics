// Entry module: loads and validates the data, then hands it to each module.

import { loadAll } from './load.js';
import { renderAnalytics, renderAnalyticsFailure } from './analytics.js';

const analyticsRegion = document.getElementById('analytics');

try {
  // Benchmark rows are also loaded here; the benchmark module will consume them when built.
  const { programs, errors } = await loadAll();
  renderAnalytics(analyticsRegion, programs, errors.filter((e) => e.file === 'programs.csv'));
} catch (err) {
  renderAnalyticsFailure(analyticsRegion, err.message);
}
