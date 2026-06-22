import { Link } from "react-router";
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

function Navbar ({ cartCount }) {
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
                    Cart <span className={styles.cartBadge}>{cartCount}</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
};
export default Navbar;