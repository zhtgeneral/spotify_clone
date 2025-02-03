
import Box from '@/components/Box';
import SideBar from '@/components/Sidebar/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import { Song } from '@/types';
import type { Meta, StoryObj } from '@storybook/react';


const mockChildren = (
  <Box className="h-52 p-6">
    Children
  </Box>
)

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