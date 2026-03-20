import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../sections/Nav';

describe('Nav', () => {
  it('renders logo', () => {
    render(<Nav lang="fr" setLang={() => {}} articleSlug={null} onBack={() => {}} />);
    expect(screen.getByText('AL-SI')).toBeInTheDocument();
  });

  it('renders navigation links in homepage mode', () => {
    render(<Nav lang="fr" setLang={() => {}} articleSlug={null} onBack={() => {}} />);
    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Projets')).toBeInTheDocument();
  });

  it('renders back button in article mode', () => {
    render(<Nav lang="fr" setLang={() => {}} articleSlug="seo-etude-de-cas" onBack={() => {}} />);
    expect(screen.getByText(/Retour/)).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn();
    render(<Nav lang="fr" setLang={() => {}} articleSlug="seo-etude-de-cas" onBack={onBack} />);
    fireEvent.click(screen.getByText(/Retour/));
    expect(onBack).toHaveBeenCalled();
  });

  it('renders language toggle', () => {
    render(<Nav lang="fr" setLang={() => {}} articleSlug={null} onBack={() => {}} />);
    const frButtons = screen.getAllByText('FR');
    expect(frButtons.length).toBeGreaterThan(0);
  });
});
