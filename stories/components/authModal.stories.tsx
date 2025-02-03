import AuthModal from '@/components/modals/AuthModal';
import SupabaseProvider from '@/providers/SupabaseProvider';
import type { Meta, StoryObj } from '@storybook/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import mockRouterContext from '../../.storybook/mocks/MockRouterContext';

const meta = {
  title: 'components/AuthModal',
  component: AuthModal,
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={mockRouterContext}>
        <SupabaseProvider>
          <Story/>  
        </SupabaseProvider>
      </AppRouterContext.Provider>
    )
  ],
  
} satisfies Meta<typeof AuthModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
