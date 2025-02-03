import AuthModal from '@/components/modals/AuthModal';
import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  title: 'components/AuthModal',
  component: AuthModal,
  args: {
    debugging: true
  },
  decorators: [
    (Story) => (
      <Story/>  
    )
  ],
  
} satisfies Meta<typeof AuthModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
