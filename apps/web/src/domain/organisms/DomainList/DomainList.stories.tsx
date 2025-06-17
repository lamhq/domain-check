import type { Meta, StoryObj } from '@storybook/react';
import DomainList from './DomainList';

const meta = {
  component: DomainList,
} satisfies Meta<typeof DomainList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
