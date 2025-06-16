import type { Meta, StoryObj } from '@storybook/react';
import type { Domain } from '../../types';
import DomainList from './DomainList';

const meta = {
  component: DomainList,
} satisfies Meta<typeof DomainList>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockDomains: Domain[] = [
  {
    id: '1',
    domain: 'example.com',
    status: 'passed' as const,
    updatedAt: new Date(),
    createdAt: new Date(),
    dmarc: true,
    spf: true,
    dkim: true,
  },
  {
    id: '2',
    domain: 'test.com',
    status: 'failed' as const,
    updatedAt: new Date(),
    createdAt: new Date(),
    dmarc: false,
    spf: false,
    dkim: true,
  },
  {
    id: '3',
    domain: 'demo.com',
    status: 'pending' as const,
    updatedAt: new Date(),
    createdAt: new Date(),
    dmarc: false,
    spf: false,
    dkim: false,
  },
];

export const Default: Story = {
  args: {
    domains: mockDomains,
  },
};

export const Empty: Story = {
  args: {
    domains: [],
  },
};

export const SingleDomain: Story = {
  args: {
    domains: [mockDomains[0]],
  },
};
