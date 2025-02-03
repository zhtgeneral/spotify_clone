
import Box from '@/components/Box';
import type { Meta, StoryObj } from '@storybook/react';


const mockChildren = (
  <div className="h-52 p-6">
    mock
  </div>
)

const meta = {
  title: 'components/Box',
  component: Box,
  args: {
    children: mockChildren,
  },
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithClassname: Story = {
  args: {
    className: "hover:bg-neutral-800"
  }
};
