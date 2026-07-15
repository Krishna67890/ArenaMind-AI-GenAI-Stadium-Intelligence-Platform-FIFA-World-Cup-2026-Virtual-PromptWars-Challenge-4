import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, formatTelemetry } from './performance';

describe('Performance Utilities', () => {
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should delay function execution', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should only execute once for multiple rapid calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('formatTelemetry', () => {
    it('should format numbers correctly', () => {
      expect(formatTelemetry(500)).toBe('500');
      expect(formatTelemetry(1500)).toBe('1.5K');
      expect(formatTelemetry(10000)).toBe('10.0K');
      expect(formatTelemetry(2500000)).toBe('2.5M');
    });
  });
});
