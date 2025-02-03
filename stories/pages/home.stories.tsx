
import { HomePresenter } from '@/app/(site)/components/HomePresenter';
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

const mockSong: Song = {
  id: "mock id",
  user_id: "mock user id",
  author: "mock author",
  title: "mock title",
  song_path: "song-test-m3ksi7v4",
  image_path: "image-test-m3ksi7v4"
}

/** This gets an array of songs which unique ids for each song */
const mockSongs = Array(50).fill(null).map((_, index) => ({
  ...mockSong,
  id: `mock id ${index + 1}`,
}));

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
export const HasSongs: Story = {
  args: {
    songs: mockSongs
  }
}