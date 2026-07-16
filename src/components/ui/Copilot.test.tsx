import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Copilot } from './Copilot';
import React from 'react';

// Mock context and services
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/services/gemini', () => ({
  askGemini: vi.fn().mockResolvedValue('COMMAND_GENERATE_ITINERARY|Itinerary\n1. 14:00 - Test Task'),
}));

describe('Copilot Component', () => {
  it('renders step 1 by default', () => {
    render(<Copilot />);
    expect(screen.getByText('ticketID')).toBeDefined();
    expect(screen.getByText('seatNumber')).toBeDefined();
  });

  it('navigates to step 2 when continue is clicked', () => {
    render(<Copilot />);
    fireEvent.click(screen.getByText('continueToPreferences'));
    expect(screen.getByText('preferredLanguage')).toBeDefined();
  });

  it('calls AI service and displays itinerary in step 3', async () => {
    render(<Copilot />);
    fireEvent.click(screen.getByText('continueToPreferences'));

    const initButton = screen.getByText('initializeCopilot');
    fireEvent.click(initButton);

    await waitFor(() => {
      expect(screen.getByText('matchdaySchedule')).toBeDefined();
      expect(screen.getByText('Test Task')).toBeDefined();
    });
  });
});
