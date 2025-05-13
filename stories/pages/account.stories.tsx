

import AccountPresenter from '@/app/(site)/account/components/AccountPresenter';
import { Subscription } from '@/types';
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

const mockSubscriptionNoName: Subscription = {
  id: "mock subscription id",
  user_id: "mock user id",
  created: "2024-11-16 23:48:01+00",
	current_period_start: "2024-11-16 23:48:01+00",
	current_period_end: "2025-11-16 23:48:01+00"
}

const mockSubscriptionHasName: Subscription = {
  id: "mock subscription id",
  user_id: "mock user id",
  created: "2024-11-16 23:48:01+00",
	current_period_start: "2024-11-16 23:48:01+00",
	current_period_end: "2025-11-16 23:48:01+00",
  prices: {
    id: "Mock price id",
    product_id: "Mock product id",
    active: true,
    description: "Mock price description",
    unit_amount: 1099,
    currency: "USD",
    type: "recurring",
    interval: "month",
    interval_count: 1,
    trial_period_days: 30,
    metadata: {},
    products: {
      id: "Mock product id",
      active: true,
      name: "Mock product name",
      description: "Mock product description",
      metadata: {},
    }
  }
}

const args = {
  user: mockUser,
  subscription: null,
  isLoading: false
}

const meta = {
  title: 'app/account',
  component: AccountPresenter,
  args: args
} satisfies Meta<typeof AccountPresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    user: null
  }
};
export const LoggedIn: Story = {}
export const LoadingNoSubscription: Story = {
  args: {
    ...args,
    isLoading: true
  }
}
export const HasSubscriptionNoName: Story = {
  args: {
    ...args,
    subscription: mockSubscriptionNoName,
    isLoading: true
  }
}
export const HasSubscriptionHasName: Story = {
  args: {
    ...args,
    subscription: mockSubscriptionHasName
  }
}
export const LoadingHasSubscription: Story = {
  args: {
    ...args,
    subscription: mockSubscriptionHasName,
    isLoading: true
  }
}