import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollReveal } from '../components/ScrollReveal';

describe('ScrollReveal', () => {
  it('renders children without crashing', () => {
    render(
      <ScrollReveal>
        <p>Hello</p>
      </ScrollReveal>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollReveal className="custom-class">
        <p>Content</p>
      </ScrollReveal>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
