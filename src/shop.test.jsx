import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ShopProvider } from './ShopContext';
import Shop from './Shop';

const mockProducts = [
  { id: 1, title: 'Test Product 1', image: 'test1.jpg', price: 10 },
  { id: 2, title: 'Test Product 2', image: 'test2.jpg', price: 20 },
];

const renderWithProvider = (component) => {
  return render(
    <ShopProvider>
      {component}
    </ShopProvider>
  );
};

describe('Shop Component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch');
  });

  it('shows loading state initially', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => new Promise(() => {}),
    });
    renderWithProvider(<Shop />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders products after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });
    renderWithProvider(<Shop />);
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
  });

  it('shows error message when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    renderWithProvider(<Shop />);
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows error message on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    renderWithProvider(<Shop />);
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});