import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CursorSpotlight } from './CursorSpotlight';
import React from 'react';

describe('CursorSpotlight', () => {
  it('renders without crashing', () => {
    const { container } = render(<CursorSpotlight />);
    expect(container.firstChild).toBeDefined();
  });
});
