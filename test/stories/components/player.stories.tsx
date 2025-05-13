
import PlayerPresenter from '@/app/components/Player/PlayerPresenter';
import { Song } from '@/app/types/types';
import type { Meta, StoryObj } from '@storybook/react';


const mockSong: Song = {
  id: "mock id",
	user_id: "mock user id",
	author: "mock author",
	title: "mock title",
	song_path: "song-test-m3ksi7v4",
	image_path: "image-test-m3ksi7v4"
}


const args = {
  song: mockSong,
  volume: 1,
  isPlaying: false,
  onPlayNext: () => {},
  togglePlay: () => {},
  onPlayPrev: () => {},
  changeVolume: (value: number) => {},
}

const meta = {
  title: 'components/player',
  component: PlayerPresenter,
  args: args,
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof PlayerPresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = {
  args: {
    ...args,
    volume: 0,
  }
}
export const MidVolume: Story = {
  args: {
    ...args,
    volume: 0.6,
  }
}