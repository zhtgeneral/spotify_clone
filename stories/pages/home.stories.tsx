
import { HomePresenter } from '@/app/(site)/components/HomePresenter';
import type { Meta, StoryObj } from '@storybook/react';

const mockUser = {
  id: "mock user",
  full_name: "mock name",
  avatar_url: null,
  billing_address: null,
  payment_method: null,
  app_metadata: {},
  user_metadata: {},
  created_at: "2025-01-05 03:45:32.833949+00",
  aud: "mock aud"
}

const meta = {
  title: 'app/home',
  component: HomePresenter,
  args: {
    songs: [],
    user: null
  }  
} satisfies Meta<typeof HomePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
export const LoggedIn: Story = {
  args: {
    user: mockUser
  }
}