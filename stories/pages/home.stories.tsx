
import { HomePresenter } from '@/app/(site)/components/HomePresenter';
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
  title: 'app/page',
  component: HomePresenter,
  args: {
    songs: [],
  },
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={createMockRouterContext()}>
        <UserProvider>
          <Story />
        </UserProvider>
      </AppRouterContext.Provider>
    )
  ]
} satisfies Meta<typeof HomePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

// TODO mock logged in view