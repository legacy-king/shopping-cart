import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useOutletContext } from 'react-router';
import Shop from './Shop';

vi.mock('react-router', () => ({
  useOutletContext: vi.fn(),
}));

const mockProducts = [
  { id: 1, title: 'Product A', image: 'a.jpg', price: 10 },
  { id: 2, title: 'Product B', image: 'b.jpg', price: 20 },
];

describe('Shop Component', () => {
  beforeEach(() => {
    useOutletContext.mockReturnValue({ addToCart: vi.fn() });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {})); // never resolves
    render(<Shop />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders products after successful fetch', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<Shop />);

    expect(await screen.findByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    render(<Shop />);

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it('shows error message on network failure', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(<Shop />);

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });
});