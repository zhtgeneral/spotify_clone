import { SearchPresenter } from '@/app/search/components/SearchPresenter';
import { Song } from '@/types';
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

const meta = {
  title: 'app/search',
  component: SearchPresenter,
  args: {
    songs: [],
    user: mockUser
  },
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
