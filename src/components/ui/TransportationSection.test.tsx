import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransportationSection } from './TransportationSection';
import React from 'react';

// Mock Language Context
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

describe('TransportationSection', () => {
  it('renders section title', () => {
    render(<TransportationSection />);
    expect(screen.getByText(/transport/i)).toBeDefined();
  });
});
