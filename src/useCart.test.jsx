import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

const product = { id: 1, title: 'Test Product', image: 'test.jpg' };

describe('useCart', () => {
  it('adds a new item to the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product, 2);
    });

    expect(result.current.items).toEqual([{ ...product, quantity: 2 }]);
  });

  it('increments quantity if item already in cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product, 1);
      result.current.addToCart(product, 2);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('removes item when quantity is updated to 0', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product, 1);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.items).toEqual([]);
  });

  it('removes item directly via removeFromCart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product, 1);
      result.current.removeFromCart(1);
    });

    expect(result.current.items).toEqual([]);
  });

  it('calculates totalItems correctly', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product, 2);
      result.current.addToCart({ ...product, id: 2 }, 3);
    });

    expect(result.current.totalItems).toBe(5);
  });
});