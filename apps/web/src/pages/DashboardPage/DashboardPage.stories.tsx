import type { Meta, StoryObj } from '@storybook/react';
import DashboardPage from './DashboardPage';

const meta = {
  component: DashboardPage,
} satisfies Meta<typeof DashboardPage>;

export default meta;

type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  args: {},
};
