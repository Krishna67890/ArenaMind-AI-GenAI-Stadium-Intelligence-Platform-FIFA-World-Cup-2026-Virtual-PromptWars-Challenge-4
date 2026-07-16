import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopilot } from './useCopilot';

// Mock askGemini
vi.mock('@/services/gemini', () => ({
  askGemini: vi.fn().mockResolvedValue('COMMAND_GENERATE_ITINERARY|Matchday Itinerary Generated:\n1. 14:00 - Test Task'),
}));

describe('useCopilot Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCopilot());
    expect(result.current.step).toBe(1);
    expect(result.current.formData.language).toBe('English');
    expect(result.current.itinerary).toBeNull();
  });

  it('should handle state transitions', () => {
    const { result } = renderHook(() => useCopilot());

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.step).toBe(2);

    act(() => {
      result.current.prevStep();
    });
    expect(result.current.step).toBe(1);
  });

  it('should generate itinerary successfully', async () => {
    const { result } = renderHook(() => useCopilot());

    await act(async () => {
      await result.current.handleGenerate();
    });

    expect(result.current.itinerary).not.toBeNull();
    expect(result.current.itinerary?.schedule[0].task).toBe('Test Task');
    expect(result.current.step).toBe(3);
  });
});
