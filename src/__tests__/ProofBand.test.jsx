import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProofBand from '../sections/ProofBand';
import { translations } from '../i18n';

describe('ProofBand', () => {
  it('renders every featured case', () => {
    render(<ProofBand lang="fr" />);
    for (const c of translations.fr.proofBand.cases) {
      expect(screen.getByText(c.client)).toBeInTheDocument();
    }
  });

  it('links a case to its article when it has one', () => {
    render(<ProofBand lang="en" />);
    const withLink = translations.en.proofBand.cases.find((c) => c.link);
    const link = screen.getByRole('link', { name: new RegExp(withLink.link.label) });
    expect(link).toHaveAttribute('href', withLink.link.href);
  });
});
