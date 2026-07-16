import { describe, it, expect } from 'vitest';
import { sanitizeInput, formatTime } from './utils';

describe('Utility Services', () => {
  describe('sanitizeInput', () => {
    it('removes script tags and dangerous protocols', () => {
      const dirty = '<script>alert(1)</script> javascript:alert(1) <img src=x onerror=alert(1)>';
      const clean = sanitizeInput(dirty);
      expect(clean).not.toContain('<script>');
      expect(clean).not.toContain('javascript:');
      expect(clean).not.toContain('onerror=');
    });

    it('trims whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('returns empty string for null/undefined', () => {
      expect(sanitizeInput(null as any)).toBe('');
    });
  });

  describe('formatTime', () => {
    it('formats HH:mm strings correctly', () => {
      // Note: local time string might vary by environment, checking inclusion
      const formatted = formatTime('14:30');
      expect(formatted).toMatch(/02:30|14:30/);
    });
  });
});
