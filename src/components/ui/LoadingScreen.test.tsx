import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from './LoadingScreen';
import React from 'react';

describe('LoadingScreen Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders the branding when loading', () => {
    render(<LoadingScreen isLoading={true} />);
    expect(screen.getByText(/ArenaMind/i)).toBeDefined();
    expect(screen.getByText(/AI/i)).toBeDefined();
  });

  it('displays the initial terminal log', () => {
    render(<LoadingScreen isLoading={true} />);
    expect(screen.getByText(/Initializing Spatial OS/i)).toBeDefined();
  });

  it('cycles through logs over time', () => {
    render(<LoadingScreen isLoading={true} />);

    vi.advanceTimersByTime(650);
    expect(screen.getByText(/Connecting to World Cup Grid/i)).toBeDefined();

    vi.advanceTimersByTime(650);
    expect(screen.getByText(/Syncing 15 Multi-Agent Nodes/i)).toBeDefined();
  });

  it('hides when isLoading is false', () => {
    const { container } = render(<LoadingScreen isLoading={false} />);
    expect(container.firstChild).toBeNull();
  });
});
