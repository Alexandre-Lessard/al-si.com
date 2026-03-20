import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui';

describe('Button', () => {
  it('renders as <a> when href is provided', () => {
    render(<Button href="#test">Click me</Button>);
    const el = screen.getByText('Click me');
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '#test');
  });

  it('renders as <button> when no href', () => {
    render(<Button>Click me</Button>);
    const el = screen.getByText('Click me');
    expect(el.tagName).toBe('BUTTON');
  });

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-accent');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary').className).toContain('border');
  });
});
