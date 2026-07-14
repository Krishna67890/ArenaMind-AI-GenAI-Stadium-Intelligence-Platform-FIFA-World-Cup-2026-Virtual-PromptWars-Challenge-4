import { describe, it, expect } from 'vitest';
import { sanitizeInput, formatTime } from './utils';

describe('Utility Functions', () => {
  it('should sanitize input by removing script tags', () => {
    const input = '<script>alert("xss")</script>FIFA-2026';
    expect(sanitizeInput(input)).toBe('scriptalert("xss")/scriptFIFA-2026');
  });

  it('should format time correctly', () => {
    expect(formatTime('14:30')).toMatch(/02:30/); // Depends on locale but testing basic functionality
  });
});
