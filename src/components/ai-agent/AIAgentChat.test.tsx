import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIAgentChat } from './AIAgentChat';
import React from 'react';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/services/gemini', () => ({
  askGemini: vi.fn().mockResolvedValue('Mock response'),
}));

describe('AIAgentChat Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the floating toggle button initially', () => {
    render(<AIAgentChat />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeDefined();
  });

  it('opens the chat window when clicked', async () => {
    render(<AIAgentChat />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/ArenaMind AI Agent/i)).toBeDefined();
  });

  it('allows typing and sending a message', async () => {
    render(<AIAgentChat />);
    fireEvent.click(screen.getByRole('button'));

    const input = screen.getByPlaceholderText(/Ask about FIFA/i);
    fireEvent.change(input, { target: { value: 'Hello AI' } });

    const sendButton = screen.getByRole('button', { name: '' }); // The one with the Send icon
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText('Hello AI')).toBeDefined();
    });
  });

  it('toggles minimization', () => {
    render(<AIAgentChat />);
    fireEvent.click(screen.getByRole('button'));

    // Find minimize button (using test-id or similar would be better, but checking by logic)
    const buttons = screen.getAllByRole('button');
    // Index depends on structure, usually 1 or 2 in header
    fireEvent.click(buttons[1]);

    // Check if input is gone (minimized)
    expect(screen.queryByPlaceholderText(/Ask about FIFA/i)).toBeNull();
  });
});
