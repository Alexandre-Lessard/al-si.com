import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('renders homepage with hero section on /', () => {
    render(<App />);
    expect(screen.getByText('Alexandre Lessard')).toBeInTheDocument();
  });

  it('renders skip to content link', () => {
    render(<App />);
    const skipLink = document.querySelector('a[href="#main"]');
    expect(skipLink).toBeInTheDocument();
  });

  it('renders main element with tabIndex for focus management', () => {
    render(<App />);
    const main = document.getElementById('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('tabindex', '-1');
  });
});
