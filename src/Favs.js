import React from "react";

const Favs = ({ favorites, toggleFavorite }) => {
  return (
    <div className="favs">
      <h1>My Favorites</h1>
      <div className="fav-box">
        {favorites.map((cont) => (
          <div key={cont.cca3 || cont.name.common} className="fav-card">
            <img
              src={cont.flags.png}
              alt="flag"
              style={{
                width: "100px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h3>{cont.name.common}</h3>
            <p>Region: {cont.region}</p>

            <div className="fav-button">
              <button
                onClick={() => toggleFavorite(cont)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <svg viewBox="0 0 16 16" width="10" height="24" fill="red">
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favs;
