import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import React from 'react';

// Mock Firebase services
vi.mock('@/services/firebase', () => ({
  getFirebaseAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn((cb) => {
      cb(null);
      return () => {};
    }),
  })),
  getFirebaseDb: vi.fn(() => ({})),
}));

describe('AuthContext', () => {
  it('should initialize with default guest state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.role).toBe('guest');
    expect(result.current.loading).toBe(true);
  });
});
