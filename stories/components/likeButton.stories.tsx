
import LikeButton from '@/components/LikeButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/LikeButton',
  component: LikeButton,
  args: {
    songId: "mock song id",
    debug: {
      isLiked: false
    }
  },
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLiked: Story = {};
export const IsLiked: Story = {
  args: {
    debug: {
      isLiked: true
    }
  }
};