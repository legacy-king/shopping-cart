import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useShopContext } from './ShopContext';
import styles from './Shop.module.css'

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useShopContext();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
  <div className={styles.container}>
    <h1 className={styles.title}>Shop</h1>
    <div className={styles.grid}>
      {products.map((product) => (
  <ProductCard key={product.id} product={product} addToCart={addToCart} />
))}
    </div>
  </div>
);
}

export default Shop;