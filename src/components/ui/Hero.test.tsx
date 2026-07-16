import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import React from 'react';

// Mock Language Context
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const trans: Record<string, string> = {
        heroTitle: 'ArenaMind AI',
        heroSubtitle: 'The Future of Intelligent Stadium Operations.',
        launchPlatform: 'Launch Platform',
        watchOverview: 'Watch Overview'
      };
      return trans[key] || key;
    },
  }),
}));

// Mock Auth Context
vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
  }),
}));

describe('Hero Component', () => {
  it('renders correctly with translated text', () => {
    render(<Hero />);
    expect(screen.getByText('ArenaMind AI')).toBeDefined();
    expect(screen.getByText(/Future of Intelligent Stadium Operations/i)).toBeDefined();
  });

  it('renders primary call to action buttons', () => {
    render(<Hero />);
    expect(screen.getByText(/Launch Platform/i)).toBeDefined();
    expect(screen.getByText(/Watch Overview/i)).toBeDefined();
  });
});
