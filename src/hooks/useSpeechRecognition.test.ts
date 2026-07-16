import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSpeechRecognition } from './useSpeechRecognition';

describe('useSpeechRecognition Hook', () => {
  const onResultMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock SpeechRecognition
    (window as any).webkitSpeechRecognition = vi.fn().mockImplementation(() => ({
      start: vi.fn(),
      stop: vi.fn(),
      continuous: false,
      interimResults: false,
    }));
  });

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useSpeechRecognition(onResultMock));
    expect(result.current.isListening).toBe(false);
    expect(result.current.isSupported).toBe(true);
  });

  it('should toggle listening state', () => {
    const { result } = renderHook(() => useSpeechRecognition(onResultMock));

    act(() => {
      result.current.toggleListening();
    });
    expect(result.current.isListening).toBe(true);

    act(() => {
      result.current.toggleListening();
    });
    expect(result.current.isListening).toBe(false);
  });
});
