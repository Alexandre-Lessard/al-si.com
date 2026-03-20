import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageToggle from '../components/LanguageToggle';

describe('LanguageToggle', () => {
  it('renders FR and EN buttons', () => {
    render(<LanguageToggle lang="fr" setLang={() => {}} />);
    expect(screen.getByText('FR')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('calls setLang with "en" when EN is clicked', () => {
    const setLang = vi.fn();
    render(<LanguageToggle lang="fr" setLang={setLang} />);
    fireEvent.click(screen.getByText('EN'));
    expect(setLang).toHaveBeenCalledWith('en');
  });

  it('calls setLang with "fr" when FR is clicked', () => {
    const setLang = vi.fn();
    render(<LanguageToggle lang="en" setLang={setLang} />);
    fireEvent.click(screen.getByText('FR'));
    expect(setLang).toHaveBeenCalledWith('fr');
  });

  it('calls onSelect callback when provided', () => {
    const onSelect = vi.fn();
    render(<LanguageToggle lang="fr" setLang={() => {}} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('EN'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders inline variant with different styling', () => {
    const { container } = render(<LanguageToggle lang="fr" setLang={() => {}} variant="inline" />);
    expect(container.querySelector('.border-t')).toBeInTheDocument();
  });
});
