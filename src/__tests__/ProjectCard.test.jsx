import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../sections/Projects';

describe('ProjectCard', () => {
  it('renders all project cards', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText('Terra Indomita')).toBeInTheDocument();
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByText("Laboratoire d'IA locale")).toBeInTheDocument();
  });

  it('renders situation, intervention and result for each card', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText(/École de survie qui voulait gérer son site/)).toBeInTheDocument();
    expect(screen.getByText(/Lancer une plateforme SaaS/)).toBeInTheDocument();
    expect(screen.getByText(/Des machines sous-utilisées sur mon réseau/)).toBeInTheDocument();
  });

  it('renders a short subtitle under each project title', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText(/Site vitrine \+ calendrier d'événements/)).toBeInTheDocument();
    expect(screen.getByText(/Plateforme en ligne d'enregistrement/)).toBeInTheDocument();
    expect(screen.getByText(/Un GPU de centre de données de 2014/)).toBeInTheDocument();
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

  it('opens external projects in a new tab and internal pages in place', () => {
    render(<Projects lang="fr" />);
    const external = screen.getByRole('link', { name: 'Terra Indomita' });
    expect(external).toHaveAttribute('target', '_blank');
    const internal = screen.getByRole('link', { name: "Laboratoire d'IA locale" });
    expect(internal).toHaveAttribute('href', '/fr/article/llm-modernes-tesla-k80-2014/');
    expect(internal).not.toHaveAttribute('target');
  });
});
