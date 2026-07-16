import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import React from 'react';

const ProblemChild = ({ shouldThrow = false, message = "Error" }) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>Normal Child</div>;
};

describe('WebGLErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <WebGLErrorBoundary>
        <ProblemChild />
      </WebGLErrorBoundary>
    );
    expect(screen.getByText('Normal Child')).toBeDefined();
  });

  it('renders WebGL recovery UI when a WebGL error occurs', () => {
    // Suppress console.error for this test
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <WebGLErrorBoundary>
        <ProblemChild shouldThrow={true} message="WebGL context lost" />
      </WebGLErrorBoundary>
    );

    expect(screen.getByText(/GPU Context Lost/i)).toBeDefined();
    expect(screen.getByText(/Re-Initialize Link/i)).toBeDefined();
  });

  it('renders generic recovery UI for non-WebGL errors', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <WebGLErrorBoundary>
        <ProblemChild shouldThrow={true} message="General System Failure" />
      </WebGLErrorBoundary>
    );

    expect(screen.getByText(/Interface Error/i)).toBeDefined();
  });

  it('triggers page reload on retry click', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const reloadSpy = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true
    });

    render(
      <WebGLErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </WebGLErrorBoundary>
    );

    fireEvent.click(screen.getByText(/Re-Initialize Link/i));
    expect(reloadSpy).toHaveBeenCalled();
  });
});
