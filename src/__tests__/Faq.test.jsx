import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Faq from '../sections/Faq';
import { translations } from '../i18n';

describe('Faq', () => {
  it('renders the FR title and all FR questions', () => {
    render(<Faq lang="fr" />);
    expect(screen.getByRole('heading', { level: 2, name: /Questions fréquentes/i })).toBeInTheDocument();
    for (const item of translations.fr.faq.items) {
      expect(screen.getByRole('button', { name: item.question })).toBeInTheDocument();
    }
  });

  it('renders the EN title and all EN questions', () => {
    render(<Faq lang="en" />);
    expect(screen.getByRole('heading', { level: 2, name: /Frequently asked questions/i })).toBeInTheDocument();
    for (const item of translations.en.faq.items) {
      expect(screen.getByRole('button', { name: item.question })).toBeInTheDocument();
    }
  });

  it('starts with all items collapsed (aria-expanded=false)', () => {
    render(<Faq lang="fr" />);
    const buttons = screen.getAllByRole('button');
    for (const btn of buttons) {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('opens an item on click and reflects aria-expanded', () => {
    render(<Faq lang="fr" />);
    const firstQuestion = translations.fr.faq.items[0].question;
    const button = screen.getByRole('button', { name: firstQuestion });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(translations.fr.faq.items[0].answer)).toBeInTheDocument();
  });

  it('closes an item on second click', () => {
    render(<Faq lang="fr" />);
    const firstQuestion = translations.fr.faq.items[0].question;
    const button = screen.getByRole('button', { name: firstQuestion });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('allows multiple items to be opened simultaneously', () => {
    render(<Faq lang="fr" />);
    const q1 = screen.getByRole('button', { name: translations.fr.faq.items[0].question });
    const q2 = screen.getByRole('button', { name: translations.fr.faq.items[1].question });
    fireEvent.click(q1);
    fireEvent.click(q2);
    expect(q1).toHaveAttribute('aria-expanded', 'true');
    expect(q2).toHaveAttribute('aria-expanded', 'true');
  });

  it('links each panel to its button via aria-controls and id', () => {
    render(<Faq lang="fr" />);
    const button = screen.getByRole('button', { name: translations.fr.faq.items[0].question });
    fireEvent.click(button);
    const panelId = button.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('aria-labelledby', button.getAttribute('id'));
    expect(within(panel).getByText(translations.fr.faq.items[0].answer)).toBeInTheDocument();
  });
});
