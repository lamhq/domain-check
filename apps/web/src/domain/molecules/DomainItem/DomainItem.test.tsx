import { render, screen } from '@testing-library/react';
import type { Domain } from '../../types';
import DomainItem from './DomainItem';

describe('DomainItem', () => {
  const baseDomain: Domain = {
    id: '1',
    domain: 'example.com',
    updatedAt: new Date(),
    createdAt: new Date(),
    dmarc: false,
    spf: false,
    dkim: false,
    status: 'pending',
  };

  it('renders domain name and pending status', () => {
    render(<DomainItem domain={{ ...baseDomain, status: 'pending' }} />);
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('(checking...)')).toBeInTheDocument();
    expect(screen.getByText(/The check is still in progress/i)).toBeInTheDocument();
  });

  it('renders domain name and passed status with count', () => {
    render(
      <DomainItem
        domain={{
          ...baseDomain,
          status: 'passed',
          dmarc: true,
          spf: true,
          dkim: true,
        }}
      />,
    );
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('(passed 3/3)')).toBeInTheDocument();
    // Should render all RecordCheckStatus components
    expect(screen.getByText(/SPF/)).toBeInTheDocument();
    expect(screen.getByText(/DKIM/)).toBeInTheDocument();
    expect(screen.getByText(/DMARC/)).toBeInTheDocument();
  });

  it('renders domain name and failed status with count and errors', () => {
    render(
      <DomainItem
        domain={{
          ...baseDomain,
          status: 'failed',
          dmarc: false,
          dmarcError: 'DMARC record is not found',
          spf: false,
          spfError: 'SPF record is not found',
          dkim: true,
        }}
      />,
    );
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('(failed 1/3)')).toBeInTheDocument();
    expect(screen.getByText(/SPF record is not found/i)).toBeInTheDocument();
    expect(screen.getByText(/DMARC record is not found/i)).toBeInTheDocument();
  });
});
