import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ cart, isOpen, onClose, onUpdateQty, onRemove}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const toCheckout = () => {
        onClose();
        navigate("/checkout");
    }

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2>Your Cart ({cart.length})</h2>
                    <button className="btn-close" type="button" onClick={onClose}>&times;</button>
                </div>

                <div className="drawer-body">
                    {cart.length === 0 ? (
                        <div className="empty-cart">Your cart is currently empty</div>
                    ) : (
                        <ul className="cart-list">
                            {cart.map((item) => (
                                <li className="cart-item" key={item.id}>
                                    <img className="item-img" src={item.image} alt={item.title} />

                                    <div className="item-info">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>

                                        <div className="qty-controls">
                                            <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>

                                            <button className="btn-remove" onClick={() => onRemove(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                {cart.length > 0 && (
                    <div className="drawer-footer">
                        <div className="subtotal-row">
                            <span>Subtotal:</span>
                            <strong>${subtotal.toFixed(2)}</strong>
                        </div>

                        <button className="btn btn-primary btn-block" type="button" onClick={toCheckout}>Proceed To Checkout</button>
                    </div>
                )}
            </aside>
        </div>
    );
}

export default CartDrawer;