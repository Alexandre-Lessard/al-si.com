import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../sections/Projects';

describe('ProjectCard', () => {
  it('renders all project cards', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText("Plugin WordPress — Gestion d'abonnements")).toBeInTheDocument();
  });

  it('shows coming soon badge on comingSoon projects', () => {
    render(<Projects lang="fr" />);
    expect(screen.getByText('À venir')).toBeInTheDocument();
  });

  it('does not render a stretched link for comingSoon projects', () => {
    render(<Projects lang="fr" />);
    const badge = screen.getByText('À venir');
    const card = badge.closest('article');
    const stretchedLink = card.querySelector('a.absolute.inset-0');
    expect(stretchedLink).toBeNull();
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
