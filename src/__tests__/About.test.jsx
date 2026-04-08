import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../sections/About';
import { translations } from '../i18n';

describe('About', () => {
  it('renders the section title in FR', () => {
    render(<About lang="fr" />);
    expect(screen.getByRole('heading', { level: 2, name: 'À propos de moi' })).toBeInTheDocument();
  });

  it('renders the audience block (label + text) in FR', () => {
    render(<About lang="fr" />);
    expect(screen.getByRole('heading', { level: 3, name: translations.fr.about.audience.label })).toBeInTheDocument();
    expect(screen.getByText(translations.fr.about.audience.text)).toBeInTheDocument();
  });

  it('renders the audience block (label + text) in EN', () => {
    render(<About lang="en" />);
    expect(screen.getByRole('heading', { level: 3, name: translations.en.about.audience.label })).toBeInTheDocument();
    expect(screen.getByText(translations.en.about.audience.text)).toBeInTheDocument();
  });

  it('renders the method block with all items', () => {
    render(<About lang="fr" />);
    expect(screen.getByRole('heading', { level: 3, name: translations.fr.about.method.title })).toBeInTheDocument();
    for (const item of translations.fr.about.method.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('renders all stats', () => {
    render(<About lang="fr" />);
    for (const stat of translations.fr.about.stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });
});
