import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../sections/Projects';

describe('ProjectCard', () => {
  it('renders all project cards', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText('Terra Indomita')).toBeInTheDocument();
    expect(screen.getByText('RNBP Canada')).toBeInTheDocument();
    expect(screen.getByText('Portfolio v2')).toBeInTheDocument();
  });

  it('renders situation, intervention and result for each card', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText(/École de survie qui voulait gérer son site/)).toBeInTheDocument();
    expect(screen.getByText(/Lancer une plateforme SaaS/)).toBeInTheDocument();
    expect(screen.getByText(/Mon portfolio précédent/)).toBeInTheDocument();
  });

  it('renders a short subtitle under each project title', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText(/Site vitrine \+ calendrier d'événements/)).toBeInTheDocument();
    expect(screen.getByText(/Plateforme en ligne d'enregistrement/)).toBeInTheDocument();
    expect(screen.getByText(/Refonte de mon propre site/)).toBeInTheDocument();
  });

  it('renders a stretched link for clickable projects', () => {
    render(<Projects lang="fr" />);
    const links = document.querySelectorAll('a[aria-label]');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders GitHub button on projects with github url', () => {
    render(<Projects lang="fr" />);
    const githubButtons = screen.getAllByLabelText('GitHub');
    expect(githubButtons.length).toBeGreaterThan(0);
  });
});
