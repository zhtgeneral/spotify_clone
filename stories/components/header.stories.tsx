
import Box from '@/components/Box';
import Header from '@/components/Header/Header';
import UserProvider from '@/providers/UserProvider';
import type { Meta, StoryObj } from '@storybook/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import mockRouterContext from '../../.storybook/mocks/MockRouterContext';

const mockUser = {
  id: "mock user",
  full_name: "mock name",
  avatar_url: null,
  billing_address: null,
  payment_method: null,
  app_metadata: {},
  user_metadata: {},
  created_at: "2025-01-05 03:45:32.833949+00",
  aud: "mock aud"
}

const mockChildren = (
  <Box className="h-52 p-6">
    Children
  </Box>
)

const meta = {
  title: 'components/Header',
  component: Header,
  args: {
    user: null,
    children: null
  },
  parameters: {
    layout: 'fulscreen'
  },
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={mockRouterContext}>
        <UserProvider>
          <Story />
        </UserProvider>
      </AppRouterContext.Provider>
    )
  ]
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
export const LoggedIn: Story = {
  args: {
    user: mockUser
  }
};
export const Children: Story = {
  args: {
    children: mockChildren
  }
}