import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageToggle from '../components/LanguageToggle';

describe('LanguageToggle', () => {
  it('renders FR and EN links', () => {
    render(<LanguageToggle lang="fr" />);
    expect(screen.getByText('FR')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('FR link points to /fr/ and EN link to /en/ when on home', () => {
    render(<LanguageToggle lang="fr" />);
    expect(screen.getByText('FR').closest('a')).toHaveAttribute('href', '/fr/');
    expect(screen.getByText('EN').closest('a')).toHaveAttribute('href', '/en/');
  });

  it('calls onSelect callback when provided', () => {
    const onSelect = vi.fn();
    render(<LanguageToggle lang="fr" onSelect={onSelect} />);
    fireEvent.click(screen.getByText('EN'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders inline variant with different styling', () => {
    const { container } = render(<LanguageToggle lang="fr" variant="inline" />);
    expect(container.querySelector('.border-t')).toBeInTheDocument();
  });
});
