import { SearchPresenter } from '@/app/search/components/SearchPresenter';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import { Song } from '@/types';
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

const mockSongs: Song[] = [
  {
    id: "mock id",
    title: "mock title",
    user_id: "mock user id",
    author: "mock author",
    song_path: "song-test-m3ksjin5",
    image_path: "image-test-m3ksjin5"
  },
  {
    id: "mock id",
    title: "mock title",
    user_id: "mock user id",
    author: "mock author",
    song_path: "song-test-m3ksi7v4",
    image_path: "image-test-m3ksi7v4"
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
  title: 'app/search',
  component: SearchPresenter,
  args: {
    songs: [],
    user: mockUser
  },
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={createMockRouterContext()}>
        <SupabaseProvider>
          <UserProvider>
            <Story />
          </UserProvider>
        </SupabaseProvider>
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
