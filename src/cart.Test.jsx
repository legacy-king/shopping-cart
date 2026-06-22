import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext } from 'react-router';
import Cart from './Cart';

vi.mock('react-router', () => ({
  useOutletContext: vi.fn(),
}));

const mockItem = {
  id: 1,
  title: 'Test Product',
  image: 'test.jpg',
  quantity: 2,
};

describe('Cart Component', () => {
  it('shows empty cart message when there are no items', () => {
    useOutletContext.mockReturnValue({
      items: [],
      updateQuantity: () => {},
      removeFromCart: () => {},
    });

    render(<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders item details when cart has items', () => {
    useOutletContext.mockReturnValue({
      items: [mockItem],
      updateQuantity: () => {},
      removeFromCart: () => {},
    });

    render(<Cart />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('calls updateQuantity with incremented value when + is clicked', async () => {
    const mockUpdateQuantity = vi.fn();
    useOutletContext.mockReturnValue({
      items: [mockItem],
      updateQuantity: mockUpdateQuantity,
      removeFromCart: () => {},
    });

    const user = userEvent.setup();
    render(<Cart />);

    const incrementButton = screen.getByRole('button', { name: '+' });
    await user.click(incrementButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('calls updateQuantity with decremented value when - is clicked', async () => {
    const mockUpdateQuantity = vi.fn();
    useOutletContext.mockReturnValue({
      items: [mockItem],
      updateQuantity: mockUpdateQuantity,
      removeFromCart: () => {},
    });

    const user = userEvent.setup();
    render(<Cart />);

    const decrementButton = screen.getByRole('button', { name: '-' });
    await user.click(decrementButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('calls removeFromCart with correct id when Remove is clicked', async () => {
    const mockRemoveFromCart = vi.fn();
    useOutletContext.mockReturnValue({
      items: [mockItem],
      updateQuantity: () => {},
      removeFromCart: mockRemoveFromCart,
    });

    const user = userEvent.setup();
    render(<Cart />);

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('removes item when quantity is decremented to 0', async () => {
  const mockUpdateQuantity = vi.fn();
  const itemWithQtyOne = { ...mockItem, quantity: 1 };

  useOutletContext.mockReturnValue({
    items: [itemWithQtyOne],
    updateQuantity: mockUpdateQuantity,
    removeFromCart: () => {},
  });

  const user = userEvent.setup();
  render(<Cart />);

  const decrementButton = screen.getByRole('button', { name: '-' });
  await user.click(decrementButton);

  expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 0);
});
});