import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SustainabilitySection } from './SustainabilitySection';
import React from 'react';

// Mock Language Context
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

describe('SustainabilitySection', () => {
  it('renders section title', () => {
    render(<SustainabilitySection />);
    expect(screen.getByText(/sustainability/i)).toBeDefined();
  });
});
