import SubscribeModal from '@/components/modals/SubscribeModal';
import { ProductWithPrice } from '@/types';
import type { Meta, StoryObj } from '@storybook/react';

const mockProductsNoPrices: ProductWithPrice[] = [
  {
    id: "mock product id 1",
    active: true,
    name: "mock product name",    
    metadata: {},
  },
  {
    id: "mock product id 2",
    active: true,
    name: "mock product name",    
    metadata: {},
  },
]

const mockProductsHasPrices: ProductWithPrice[] = [
  {
    id: "mock product id 1",
    active: true,
    name: "mock product name",    
    metadata: {},
    prices: [
      {
        id: "mock price id 1",
        product_id: "mock product id 1",
        active: true,
        unit_amount: 1099,
        currency: "USD",
        interval: "month"
      },
      {
        id: "mock price id 2",
        product_id: "mock product id 1",
        active: true,
        unit_amount: 399,
        currency: "USD",
        interval: "month"
      }
    ]
  },
  {
    id: "mock stripe id 2",
    active: true,
    name: "mock product name 2",    
    metadata: {},
    prices: [
      {
        id: "mock price id 3",
        product_id: "mock product id 2",
        active: true,
        unit_amount: 99,
        currency: "USD",
        interval: "week"
      },
    ]
  }
]

const mockSubscription = {
  id: "mock subscription id",
  user_id: "mock user id",
  created: "2024-11-16 23:48:01+00",
	current_period_start: "2024-11-16 23:48:01+00",
	current_period_end: "2025-11-16 23:48:01+00"
}

const debug = {
  isOpen: true,
  subscription: null,
  priceLoading: "",
  userIsLoading: false
}

const meta = {
  title: 'components/SubcribeModal',
  component: SubscribeModal,
  args: {
    debug: debug,
    products: mockProductsHasPrices
  },
  decorators: [
    (Story) => (
      <Story/>  
    )
  ],
  
} satisfies Meta<typeof SubscribeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoProducts: Story = {
  args: {
    products: []
  }
};
export const HasProductsNoPrices: Story = {
  args: {
    products: mockProductsNoPrices
  }
}
export const HasProductsHasPrices: Story = {
  args: {
    products: mockProductsHasPrices
  }
}
export const SingleProductDisabled: Story = {
  args: {
    debug: {
      ...debug,
      priceLoading: "mock price id 1"
    }    
  }
}
export const AllProductsDisabled: Story = {
  args: {
    debug: {
      ...debug,
      userIsLoading: true
    }
  }
}
export const HasSubscription: Story = {
  args: {
    debug: {
      ...debug,
      subscription: mockSubscription
    }
  }
}