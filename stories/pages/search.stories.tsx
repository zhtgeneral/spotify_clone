import { SearchPresenter } from '@/app/search/components/SearchPresenter';
import UserProvider from '@/providers/UserProvider';
import type { Meta, StoryObj } from '@storybook/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

const mockSongs = [
  {
    id: "mock id",
    created_at: "2025-01-05 03:45:32.833949+00",
    title: "mock song",
    song_path: "mock song",
    image_path: "mock image",
    author: "mock author",
    user_id: "mock id"
  },
  {
    id: "mock id",
    created_at: "2025-01-05 03:45:32.833949+00",
    title: "mock song",
    song_path: "mock song",
    image_path: "mock image",
    author: "mock author",
    user_id: "mock id"
  },
  {
    id: "mock id",
    created_at: "2025-01-05 03:45:32.833949+00",
    title: "mock song",
    song_path: "mock song",
    image_path: "mock image",
    author: "mock author",
    user_id: "mock id"
  },
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
  title: 'app/search',
  component: SearchPresenter,
  args: {
    songs: [],
    user: mockUser
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

export const LoggedOut: Story = {
  args: {
    user: null
  }
}
export const NoSongs: Story = {};

//  TODO causes supabaseClient.storage is undefined need to mock
export const ManySong: Story = {
  args: {
    songs: mockSongs
  }
};
