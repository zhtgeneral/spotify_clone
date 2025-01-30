
import Input from '@/components/Input';
import type { Meta, StoryObj } from '@storybook/react';


const mockChildren = (
  <div className="h-52 p-2">
    mock
  </div>
)

const meta = {
  title: 'components/Input',
  component: Input,
  args: {},
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  
} satisfies Meta<typeof Input>;

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
export const PasswordType: Story = {
  args: {
    type: "password"
  }
}
export const DateType: Story = {
  args: {
    type: "date"
  }
}
export const FileType: Story = {
  args: {
    type: "file"
  }
}
export const HiddenType: Story = {
  args: {
    type: "hidden",
  }
}