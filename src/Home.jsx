import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from './Home.module.css'

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to Our Shop</h1>
        <p>
          We curate quality products across fashion, electronics, and more —
          all in one place. Browse our shop to find something you'll love.
        </p>
        <Link to="/shop">
          <button className={styles.shopBtn} >Shop Now</button>
        </Link>
      </section>

      <section className={styles.featured}>
        <h2>Featured Products</h2>
        {loading && <p>Loading featured products...</p>}
        {error && <p>Something went wrong: {error}</p>}
        {!loading && !error && (
          <div className={styles.featuredGrid}>
  {featured.map((product) => (
    <div key={product.id} className={styles.featuredCard}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;