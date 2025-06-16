import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SignInForm from './SignInForm';

const meta = {
  component: SignInForm,
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      username: 'test',
      password: 'pwd',
    },
    onSubmit: fn(),
    isSubmitting: false,
  },
};
