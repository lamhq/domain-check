import { render, screen } from '@testing-library/react';
import Typography from './Typography';

// Helper to get the rendered element
const getTypography = () => screen.getByText('Test Typography');

describe('Typography', () => {
  it('renders with default variant (body1)', () => {
    render(<Typography>Test Typography</Typography>);
    const typo = getTypography();
    expect(typo).toBeInTheDocument();
  });

  it('renders with h1 variant', () => {
    render(<Typography variant="h1">Test Typography</Typography>);
    const typo = getTypography();
    expect(typo).toBeInTheDocument();
  });

  it('renders with h2 variant', () => {
    render(<Typography variant="h2">Test Typography</Typography>);
    const typo = getTypography();
    expect(typo).toBeInTheDocument();
  });

  it('renders with h3 variant', () => {
    render(<Typography variant="h3">Test Typography</Typography>);
    const typo = getTypography();
    expect(typo).toBeInTheDocument();
  });

  it('renders with h4 variant', () => {
    render(<Typography variant="h4">Test Typography</Typography>);
    const typo = getTypography();
    expect(typo).toBeInTheDocument();
  });

  it('renders with body2 variant', () => {
    render(<Typography variant="body2">Test Typography</Typography>);
    const typo = getTypography();
    expect(typo).toBeInTheDocument();
  });
});
