import { useShopContext } from './ShopContext';
import styles from './Cart.module.css'



function Cart () {
    const { items, updateQuantity, removeFromCart } = useShopContext();

    if (items.length === 0) return <p className={styles.empty}>Your cart is empty</p>;

return (
  <div className={styles.container}>
    <h1 className={styles.title}>Your Cart</h1>
    {items.map((item) => (
      <div key={item.id} className={styles.item}>
        <img className={styles.image} src={item.image} alt={item.title} />
        <div className={styles.info}>
          <h3>{item.title}</h3>
          <div className={styles.controls}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
        </div>
        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    ))}
  </div>
);

}


export default Cart;