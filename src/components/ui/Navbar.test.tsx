import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import React from 'react';

// Mock the context hooks
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => key,
    setLanguage: vi.fn(),
  }),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    role: 'guest',
    logout: vi.fn(),
  }),
}));

// Mock Link and other dependencies
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>,
}));

describe('Navbar Component', () => {
  it('renders the brand name and login button', () => {
    render(<Navbar />);
    expect(screen.getByText('ArenaMind AI')).toBeDefined();
    expect(screen.getByText('login')).toBeDefined();
  });

  it('has correct ARIA labels for accessibility', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeDefined();
  });
});
