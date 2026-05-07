import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('package.json', () => {
  const pkg = JSON.parse(
    readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'),
  ) as { name: string; peerDependencies: Record<string, string> };

  it('is renamed to @inferagraph/log-analytics', () => {
    expect(pkg.name).toBe('@inferagraph/log-analytics');
  });
});
