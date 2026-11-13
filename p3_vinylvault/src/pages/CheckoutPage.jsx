import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = ({ cart, clearCart }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        zip: "",
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = subtotal * 0.06;
    const total = subtotal + taxes;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        clearCart();
    }

    if (isSubmitted) {
        return (
            <div className="checkout-success">
                <h2>&#x1F389; Order Placed Successfully</h2>
                <p className="success-text">Thanks for your purchase, {formData.name}! A confirmation email has been sent to {formData.email}.</p>
                <Link className="btn btn-primary" to="/"> Return to Home</Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Your cart is empty.</h2>
                <Link className="btn btn-secondary" to="/">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Checkout and Order Confirmation</h1>

            <div className="page-grid checkout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Shipping Details</h2>

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name <span className="required-star">*</span></label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email <span className="required-star">*</span></label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="address">Shipping Address <span className="required-star">*</span></label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className="form-input"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="zip">ZIP Code <span className="required-star">*</span></label>
                        <input
                            type="text"
                            name="zip"
                            id="zip"
                            className="form-input"
                            value={formData.zip}
                            pattern="[0-9]{5}"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-primary btn-block btn-lg" type="submit">Place Order (${total.toFixed(2)})</button>
                </form>

                <aside className="order-summary">
                    <h2>Order Summary</h2>

                    <ul className="summary-list">
                        {cart.map((item) => (
                            <li className="summary-row" key={item.id}>
                                <span>{item.title} &times; {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <hr />
                    
                    <div className="summary-row">
                        <span>Estimated Tax (6%):</span> <span>${taxes.toFixed(2)}</span>
                    </div>

                    <div className="summary-row total-row">
                        <span>Total:</span> <span>${total.toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </div>
  );
}

export default CheckoutPage;