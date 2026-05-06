import { LogAnalyticsDataSource } from './LogAnalyticsDatasource.js';
import type { LogAnalyticsDataSourceConfig } from './types.js';

/**
 * Factory function that returns a configured `LogAnalyticsDataSource`.
 * This is the recommended on-ramp — the package internalizes Azure SDK
 * construction (storage owns SDK setup), so callers only supply domain
 * config (workspace, auth, queries, mapping).
 *
 * Direct `new LogAnalyticsDataSource(config)` construction is the escape
 * hatch for subclasses or callers that want to bypass the factory.
 */
export function logAnalyticsDataSource(
  config: LogAnalyticsDataSourceConfig,
): LogAnalyticsDataSource {
  return new LogAnalyticsDataSource(config);
}
