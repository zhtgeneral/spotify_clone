import { SearchPresenter } from '@/app/search/components/SearchPresenter';
import UserProvider from '@/providers/UserProvider';
import type { Meta, StoryObj } from '@storybook/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const mockSongs = [
  {
    id: "mock id",
    created_at: "2025-01-05 03:45:32.833949+00",
    title: "mock song",
    song_path: "mock song",
    image_path: "mock image",
    author: "mock author",
    user_id: "mock id"
  }
]

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
  title: 'search',
  component: SearchPresenter,
  args: {
    songs: []
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
} satisfies Meta<typeof SearchPresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoSongs: Story = {};
export const ManySong: Story = {
  args: {
    songs: mockSongs
  }
};
