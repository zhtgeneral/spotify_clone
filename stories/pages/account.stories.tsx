

import AccountPage from '@/app/account/page';
import UserProvider from '@/providers/UserProvider';
import type { Meta, StoryObj } from '@storybook/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/** This is the mock for app router context */
const createMockRouterContext = () => ({
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  refresh: () => Promise.resolve(),
  back: () => Promise.resolve(),
  forward: () => Promise.resolve(),
  prefetch: () => Promise.resolve(),
});

const meta = {
  title: 'app/account',
  component: AccountPage,
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={createMockRouterContext()}>
        <UserProvider>
          <Story />
        </UserProvider>
      </AppRouterContext.Provider>
    )
  ]
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};