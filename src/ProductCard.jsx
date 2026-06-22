import { useState } from "react";
import PropTypes from 'prop-types';
 import styles from './ProductCard.module.css';



function ProductCard({product, addToCart}) {
    const [quantity, setQuantity] = useState(1);
     const increment = () => {
        setQuantity(prev =>  prev + 1)
     }

     const decrement = () => {
        setQuantity(prev => Math.max(1, prev - 1))
     }

    
return (
  <div className={styles.card}>
<img className={styles.image} src={product.image} alt={product.title} />
    <h3 className={styles.title}>{product.title}</h3>
    <p className={styles.price}>${product.price}</p>
    <div className={styles.controls}>
      <button onClick={decrement}>-</button>
      <input type = "number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button onClick={increment}>+</button>
    </div>
    <button className={styles.addBtn} onClick={() => addToCart(product, quantity)}>
      Add To Cart
    </button>
  </div>
);
    
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;