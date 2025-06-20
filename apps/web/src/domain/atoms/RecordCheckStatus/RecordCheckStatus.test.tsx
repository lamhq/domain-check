import { render, screen } from '@testing-library/react';
import { RecordType, type Domain } from '../../types';
import RecordCheckStatus from './RecordCheckStatus';

const baseDomain: Domain = {
  id: '1',
  domain: 'example.com',
  status: 'failed',
  updatedAt: new Date(),
  createdAt: new Date(),
  dmarc: false,
  dmarcError: 'DMARC record is not found',
  spf: false,
  spfError: 'SPF record is not found',
  dkim: false,
  dkimError: 'DKIM record is not found',
};

describe('RecordCheckStatus', () => {
  it('renders SPF failed with error', () => {
    render(<RecordCheckStatus domain={baseDomain} recordType={RecordType.SPF} />);
    expect(screen.getByText(/SPF failed\./i)).toBeInTheDocument();
    expect(screen.getByText(/SPF record is not found\./i)).toBeInTheDocument();
  });

  it('renders DKIM failed with error', () => {
    render(<RecordCheckStatus domain={baseDomain} recordType={RecordType.DKIM} />);
    expect(screen.getByText(/DKIM failed\./i)).toBeInTheDocument();
    expect(screen.getByText(/DKIM record is not found\./i)).toBeInTheDocument();
  });

  it('renders DMARC failed with error', () => {
    render(<RecordCheckStatus domain={baseDomain} recordType={RecordType.DMARC} />);
    expect(screen.getByText(/DMARC failed\./i)).toBeInTheDocument();
    expect(screen.getByText(/DMARC record is not found\./i)).toBeInTheDocument();
  });

  it('renders SPF passed without error', () => {
    const domain = { ...baseDomain, spf: true, spfError: undefined };
    render(<RecordCheckStatus domain={domain} recordType={RecordType.SPF} />);
    expect(screen.getByText(/SPF passed\./i)).toBeInTheDocument();
    expect(screen.queryByText(/SPF record is not found\./i)).not.toBeInTheDocument();
  });

  it('renders DKIM passed without error', () => {
    const domain = { ...baseDomain, dkim: true, dkimError: undefined };
    render(<RecordCheckStatus domain={domain} recordType={RecordType.DKIM} />);
    expect(screen.getByText(/DKIM passed\./i)).toBeInTheDocument();
    expect(
      screen.queryByText(/DKIM record is not found\./i),
    ).not.toBeInTheDocument();
  });

  it('renders DMARC passed without error', () => {
    const domain = { ...baseDomain, dmarc: true, dmarcError: undefined };
    render(<RecordCheckStatus domain={domain} recordType={RecordType.DMARC} />);
    expect(screen.getByText(/DMARC passed\./i)).toBeInTheDocument();
    expect(
      screen.queryByText(/DMARC record is not found\./i),
    ).not.toBeInTheDocument();
  });
});
