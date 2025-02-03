import UploadModal from '@/components/modals/UploadModal';
import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  title: 'components/modals/UploadModal',
  component: UploadModal,
  args: {
    debug: {
      isOpen: true
    }
  },
  decorators: [
    (Story) => (
      <Story/>  
    )
  ],
  
} satisfies Meta<typeof UploadModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
