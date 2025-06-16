import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DomainFormView from './DomainFormView';

const meta = {
  component: DomainFormView,
} satisfies Meta<typeof DomainFormView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      domain: 'example.com',
    },
    onSubmit: fn(),
    isSubmitting: false,
  },
};
