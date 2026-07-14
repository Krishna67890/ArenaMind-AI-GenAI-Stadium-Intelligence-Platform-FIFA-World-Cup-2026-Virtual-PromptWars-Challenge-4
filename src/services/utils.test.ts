import { describe, it, expect } from 'vitest';
import { sanitizeInput, formatTime } from './utils';

describe('Utility Functions', () => {
  describe('sanitizeInput', () => {
    it('should sanitize input by removing script tags', () => {
      const input = '<script>alert("xss")</script>FIFA-2026';
      expect(sanitizeInput(input)).toBe('scriptalert("xss")/scriptFIFA-2026');
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should trim whitespace from both ends', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('should remove multiple tags', () => {
      const input = '<div><span>Hello</span></div>';
      expect(sanitizeInput(input)).toBe('divspanHellospandiv');
    });

    it('should handle strings with no special characters', () => {
      const input = 'Safe String 123';
      expect(sanitizeInput(input)).toBe('Safe String 123');
    });

    it('should handle complex nested tags', () => {
      const input = '<<<<script>alert(1)</script>>>>';
      expect(sanitizeInput(input)).toBe('scriptalert(1)/script');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime('14:30')).toMatch(/02:30/); // Depends on locale but testing basic functionality
    });

    it('should handle AM times', () => {
      expect(formatTime('09:15')).toMatch(/09:15/);
    });
  });
});
