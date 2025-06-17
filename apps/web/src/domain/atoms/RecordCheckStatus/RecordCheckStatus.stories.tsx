import type { Meta, StoryObj } from '@storybook/react';
import type { Domain } from '../../types';
import { RecordType } from '../../types';
import RecordCheckStatus from './RecordCheckStatus';

const meta = {
  component: RecordCheckStatus,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecordCheckStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockDomain: Domain = {
  id: '1',
  domain: 'example.com',
  status: 'failed',
  updatedAt: new Date(),
  createdAt: new Date(),
  dmarc: false,
  dmarcError: 'DMARC record is not found',
  spf: false,
  spfError: 'SPF record is not found',
  dkim: true,
};

export const SPF: Story = {
  args: {
    domain: mockDomain,
    recordType: RecordType.SPF,
  },
};

export const DKIM: Story = {
  args: {
    domain: mockDomain,
    recordType: RecordType.DKIM,
  },
};

export const DMARC: Story = {
  args: {
    domain: mockDomain,
    recordType: RecordType.DMARC,
  },
};

export const Passed: Story = {
  args: {
    domain: {
      ...mockDomain,
      spf: true,
      spfError: undefined,
    },
    recordType: RecordType.SPF,
  },
};
