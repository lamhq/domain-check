import type { Meta, StoryObj } from '@storybook/react';
import StatusIcon from './StatusIcon';

const meta = {
  component: StatusIcon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatusIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Passed: Story = {
  args: {
    status: 'passed',
  },
};

export const Failed: Story = {
  args: {
    status: 'failed',
  },
};
