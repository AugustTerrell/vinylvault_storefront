import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ cartCount, openCart }) => {
    return (
        <header className="site-header">
            <Link className="brand-logo" to="/">&#x1F3A7; VinylVault</Link>

            <nav className="nav-actions">
                <Link className="nav-link" to="/">Home</Link>
                <button className="btn-cart-badge"
                    type="button"
                    onClick={openCart}
                    aria-label={`Your cart (contains ${cartCount} items).`}
                >&#x1F6D2; Cart</button>
            </nav>
        </header>
    );
}

export default NavBar;