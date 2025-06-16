import type { Meta, StoryObj } from '@storybook/react';
import DomainForm from './DomainForm';

const meta = {
  component: DomainForm,
} satisfies Meta<typeof DomainForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
