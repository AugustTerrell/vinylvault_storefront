import React, { useState } from 'react';

const HomePage = ({ albums, addToCart}) => {
    const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];
    const [selectedGenre, setSelectedGenre] = useState("All");

    const validAlbums = albums || [];

    const filteredAlbums = selectedGenre === "All" ? validAlbums : validAlbums.filter((p) => p.genre === selectedGenre);

    return (
        <div className="home-container">
            <div className="home-hero">
                <h1>High-Quality Vintage Records</h1>
                <p>Albums of every genre collected and carefully preserved</p>
            </div>

            <div className="filter-bar">
                {genres.map((genre) => {
                    <button 
                        className={`filter-pill ${selectedGenre === cat ? "active" : ""}`}
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                    >{genre}</button>
                })}
            </div>

            <div className="album-grid">
                {filteredAlbums.map((album) => (
                    <AlbumCard key={album.id} album={album} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;