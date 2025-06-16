import type { Meta, StoryObj } from '@storybook/react';

import SignInPage from './SignInPage';

const meta = {
  component: SignInPage,
} satisfies Meta<typeof SignInPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
