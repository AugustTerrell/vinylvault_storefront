import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AlbumPage = ({ albums, addToCart }) => {
    const { albumID } = useParams();
    const [ qty, setQty ] = useState(1);

    const album = albums.find((a) => a.id === albumID);

    if (!album) {
        return (
            <div className="album-error">
                <h2>Album Not Found</h2>
                <Link className="btn btn-secondary" to="/">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="album-container">
            <nav className="breadcrumb-nav">
                <Link className="breadcrumb-link" to="/">Catalog</Link> &gt; <span>{album.title}</span>
            </nav>

            <div className="page-grid">
                <img className="details-img" src={album.image} alt={album.title} />

                <div className="details-info">
                    <span className="details-genre">{album.genre}</span>
                    <h2 className="details-title">{album.title}</h2>
                    <p className="details-price">${album.price.toFixed(2)}</p>
                    <p className="details-desc">{album.description}</p>

                    <div className="details-specs">
                        <p className="specs-title">Album Details:</p>
                        <ul className="specs-list">
                            <li className="specs-item">Pressing Weight: {album.specs.weight}</li>
                            <li className="specs-item">Catalog Number: {album.specs.catalogNumber}</li>
                            <li className="specs-item">Speed: {album.specs.speed}</li>
                            <li className="specs-item">Producer Label: {album.specs.label}</li>
                        </ul>
                    </div>

                    <div className="stock-tag">
                        {album.stock > 0 ? `✔ In Stock (${album.stock} units available)` : "Out of Stock"}
                    </div>

                    <div className="details-actions">
                        <div className="qty-inputs">
                            <label htmlFor="details-qty">Quantity: </label>
                            <input
                                type="number"
                                id="details-qty"
                                className="qty-input"
                                min="1"
                                max={album.stock}
                                value={qty}
                                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => addToCart(album, qty)}>Add {qty} to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumPage;