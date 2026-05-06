import { describe, it, expect, vi } from 'vitest';

// Mock azure deps before importing the factory so the SDK executor uses fakes.
vi.mock('@azure/identity', () => ({
  ClientSecretCredential: class {
    constructor(_t: string, _c: string, _s: string) {}
  },
  ManagedIdentityCredential: class {
    constructor() {}
  },
}));

vi.mock('@azure/monitor-query', () => ({
  LogsQueryClient: class {
    constructor(_credential: unknown) {}
    queryWorkspace = vi.fn();
  },
}));

import {
  logAnalyticsDataSource,
  LogAnalyticsDataSource,
} from '../src/index.js';
import type { LogAnalyticsDataSourceConfig } from '../src/index.js';

const baseConfig: LogAnalyticsDataSourceConfig = {
  workspaceId: 'wkspace-1',
  workspaceName: 'test-ws',
  auth: { kind: 'managed-identity' },
  queries: { nodes: 'Nodes', edges: 'Edges' },
  mapping: {
    nodes: { idColumn: 'id', typeColumn: 'type' },
    edges: {
      idColumn: 'edge_id',
      sourceColumn: 'source',
      targetColumn: 'target',
      typeColumn: 'rel',
    },
  },
};

describe('logAnalyticsDataSource factory', () => {
  it('returns a DataSource-shaped instance (extends core Datasource, exposes name + lifecycle)', () => {
    const ds = logAnalyticsDataSource(baseConfig);
    expect(ds).toBeInstanceOf(LogAnalyticsDataSource);
    expect(ds.name).toBe('log-analytics');
    expect(typeof ds.connect).toBe('function');
    expect(typeof ds.disconnect).toBe('function');
    expect(typeof ds.isConnected).toBe('function');
    expect(typeof ds.getInitialView).toBe('function');
    expect(typeof ds.getNode).toBe('function');
    expect(typeof ds.getNeighbors).toBe('function');
    expect(typeof ds.findPath).toBe('function');
    expect(typeof ds.search).toBe('function');
    expect(typeof ds.filter).toBe('function');
    expect(typeof ds.getContent).toBe('function');
  });

  it('factory and direct class construction produce the same shape (escape hatch)', () => {
    const fromFactory = logAnalyticsDataSource(baseConfig);
    const fromClass = new LogAnalyticsDataSource(baseConfig);
    expect(fromFactory.constructor).toBe(fromClass.constructor);
    expect(fromClass.name).toBe('log-analytics');
    expect(fromClass.isConnected()).toBe(false);
  });
});
