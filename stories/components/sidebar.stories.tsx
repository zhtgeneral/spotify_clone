
import Box from '@/app/components/Box';
import SideBar from '@/app/components/Sidebar/Sidebar';
import SupabaseProvider from '@/app/providers/SupabaseProvider';
import UserProvider from '@/app/providers/UserProvider';
import { Song } from '@/types';
import type { Meta, StoryObj } from '@storybook/react';


const mockChildren = (
  <Box className="h-52 p-6">
    Children
  </Box>
)

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
  title: 'components/Sidebar',
  component: SideBar,
  args: {
    children: null,
    songs: []
  },
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <SupabaseProvider>
        <UserProvider>
          <Story/>        
        </UserProvider>      
      </SupabaseProvider>
    )
  ],
  
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const HasChildren: Story = {
  args: {
    children: mockChildren
  }
}
export const HasSongs: Story = {
  args: {
    songs: mockSongs
  }
}