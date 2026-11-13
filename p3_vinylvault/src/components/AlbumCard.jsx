import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = ({ album, addToCart }) => {
    if (!album) return null;

    return (
        <article className="album-card">
            <Link className="album-img-link" to={`/albums/${album.id}`}>
                <img className="album-img" src={album.image} alt={album.title} loading="lazy" />
            </Link>

            <div className="card-body">
                <span className="album-genre">{album.genre}</span>
                <h3 className="album-title">
                    <Link to={`/albums/${album.id}`}>{album.title}</Link>
                </h3>
                <p className="album-price">${typeof album.price === "number" ? album.price.toFixed(2) : "Contact For Price"}</p>
                <button className="btn tbn-secondary btn-block" type="button" onClick={() => addToCart(album)}>Add To Cart</button>
            </div>
        </article>
    );
}

export default AlbumCard;