
import Button from '@/app/components/Button';
import type { Meta, StoryObj } from '@storybook/react';


const mockChildren = (
  <div className="h-52 p-2">
    mock
  </div>
)

const meta = {
  title: 'components/Button',
  component: Button,
  args: {
    children: mockChildren,
  },
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithClassname: Story = {
  args: {
    className: "hover:opacity-50"
  }
};
export const Disabled: Story = {
  args: {
    disabled: true
  }
}