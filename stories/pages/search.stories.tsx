import { SearchPresenter } from '@/app/(site)/search/components/SearchPresenter';
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

const mockSong = {
  id: "mock id",
  title: "mock title",
  user_id: "mock user id",
  author: "mock author",
  song_path: "song-test-m3ksjin5",
  image_path: "image-test-m3ksjin5"
}

/** This gets an array of songs which unique ids for each song */
const mockSongs = Array(50).fill(null).map((_, index) => ({
  ...mockSong,
  id: `mock id ${index + 1}`,
}));

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

export const ManySong: Story = {
  args: {
    songs: mockSongs
  }
};
