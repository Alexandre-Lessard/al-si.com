import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nav from '../sections/Nav';

describe('Nav', () => {
  it('renders logo', () => {
    render(<Nav lang="fr" articleSlug={null} />);
    expect(screen.getByAltText('AL-SI')).toBeInTheDocument();
  });

  it('renders navigation links in homepage mode', () => {
    render(<Nav lang="fr" articleSlug={null} />);
    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Projets')).toBeInTheDocument();
    expect(screen.getAllByText('FAQ').length).toBeGreaterThan(0);
  });

  it('renders back link in article mode', () => {
    render(<Nav lang="fr" articleSlug="seo-etude-de-cas" homeUrl="/" />);
    expect(screen.getByText(/Retour/)).toBeInTheDocument();
  });

  it('back link points to homeUrl', () => {
    render(<Nav lang="fr" articleSlug="seo-etude-de-cas" homeUrl="/en" />);
    expect(screen.getByText(/Retour/).closest('a')).toHaveAttribute('href', '/en');
  });

  it('renders language toggle', () => {
    render(<Nav lang="fr" articleSlug={null} />);
    const frTexts = screen.getAllByText('FR');
    expect(frTexts.length).toBeGreaterThan(0);
  });
});
