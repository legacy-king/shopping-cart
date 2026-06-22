import { Link } from "react-router";
import styles from './Navbar.module.css';
import { useShopContext } from "./ShopContext";

function Navbar () {
    const { totalItems } = useShopContext();

    return (
        <div className={styles.nav}>
            <ul className={styles.navList}>
                <li><Link className={styles.navLink} to="/">Home</Link>
                </li>
                <li>
                    <Link className={styles.navLink} to = "shop">Shop</Link>
                </li>
                <li>
                    <Link className={styles.navLink} to="cart"> 
                    Cart <span className={styles.cartBadge}>{totalItems}</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default Navbar;