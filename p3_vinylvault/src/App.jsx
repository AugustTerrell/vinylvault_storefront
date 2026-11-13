import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage'
import CheckoutPage from './pages/CheckoutPage';
import NavBar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import { ALBUMS } from './data/albums';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (album, qty = 1) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === album.id);

      if (exists) {
        return prevCart.map((item) => item.id === album.id ? { ...item, quantity: item.quantity + qty} : item);
      }

      return [...prevCart, { ...album, quantity: album.quantity + qty }];
    });

    setIsCartOpen(true);
  }

  const handleUpdateQty = (albumID, delta) => {
    setCart((prevCart) => prevCart.map((item) => {
        if (item.id === albumID) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean), );
  }

  const handleRemoveFromCart = (albumID) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumID));
  }

  const handleClearCart = () => {
    setCart([]);
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <NavBar cartCount={totalCartCount} openCart={() => setIsCartOpen(true)} />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage albums={ALBUMS} addToCart={handleAddToCart} />} />
          <Route path="/albums/:albumID" element={<AlbumPage albums={ALBUMS} addToCart={handleAddToCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={handleClearCart} />} />
        </Routes>
      </div>

      <CartDrawer cart={cart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty} onRemove={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;
