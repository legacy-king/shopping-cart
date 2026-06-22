import {describe, it, expect, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  image: 'test.jpg',
  price: 29.99,
};

describe('ProductCard Component', () => {
  it('renders the product title', () => {
    render(<ProductCard product={mockProduct} addToCart={() => {}} />);
    // assert the title shows up using screen.getByText
    const title = screen.getByText('Test Product')
    expect(title).toBeInTheDocument();
  });
  it('renders the product price', () => {
  render(<ProductCard product={mockProduct} addToCart={() => {}} />);
  expect(screen.getByText('$29.99')).toBeInTheDocument();
});

  it('increments quantity when + is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} addToCart={() => {}} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
await user.click(incrementButton);

const input = screen.getByRole("spinbutton");
expect(input.value).toBe('2');
    // click it using user.click()
    // assert the quantity input now shows 2
  });

 it('calls addToCart with correct arguments when clicked', async () => {
  const mockAddToCart = vi.fn();
  const user = userEvent.setup();
  render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

  const addButton = screen.getByRole("button", { name: "Add To Cart" });
  await user.click(addButton);

  expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
});
});
