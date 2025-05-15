import AuthModal from '@/app/components/modals/AuthModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/modals/AuthModal',
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
