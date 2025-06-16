import type { Meta, StoryObj } from '@storybook/react';
import DomainItem from './DomainItem';

const meta = {
  component: DomainItem,
} satisfies Meta<typeof DomainItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    domain: {
      id: '1',
      domain: 'example.com',
      status: 'pending',
      updatedAt: new Date(),
      createdAt: new Date(),
      dmarc: false,
      spf: false,
      dkim: false,
    },
  },
};

export const Passed: Story = {
  args: {
    domain: {
      id: '1',
      domain: 'example.com',
      status: 'passed',
      updatedAt: new Date(),
      createdAt: new Date(),
      dmarc: true,
      spf: true,
      dkim: true,
    },
  },
};

export const Failed: Story = {
  args: {
    domain: {
      id: '1',
      domain: 'example.com',
      status: 'failed',
      updatedAt: new Date(),
      createdAt: new Date(),
      dmarc: false,
      spf: false,
      dkim: true,
    },
  },
};
