import React from "react";
import "./styles.css";
import Favs from "./Favs";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      countries: [],
      errorMessage: "",
      selectedCountry: null, // Track the clicked country
      favorites: [],
    };
  }

  onInput = (e) => {
    this.setState({ input: e.target.value }, () => {
      this.getCountries();
    });
  };

  getCountries = async () => {
    const { input } = this.state;

    if (!input) {
      this.setState({ countries: [], errorMessage: "", selectedCountry: null });
      return;
    }

    try {
      const apiCall = await fetch(
        `https://restcountries.com/v3.1/name/${input}`
      );
      const data = await apiCall.json();

      if (Array.isArray(data)) {
        // Store full objects instead of just names
        const filtered = data.filter((st) =>
          st.name.common.toLowerCase().startsWith(input.toLowerCase())
        );

        if (filtered.length > 0) {
          this.setState({ countries: filtered, errorMessage: "" });
        } else {
          this.setState({ countries: [], errorMessage: "Not found" });
        }
      } else {
        this.setState({ countries: [], errorMessage: "Not found" });
      }
    } catch (err) {
      this.setState({
        countries: [],
        errorMessage: "Oops, something went wrong",
      });
    }
  };

  select = (country) => {
    // Save the whole object so we can show details later
    this.setState({
      input: country.name.common,
      countries: [],
      selectedCountry: country,
    });
  };

  toggleFavorite = (name) => {
    const favorites = this.state.favorites || [];
    if (favorites.includes(name)) {
      // Remove from favorites
      this.setState({ favorites: favorites.filter((fav) => fav !== name) });
    } else {
      // Add to favorites
      this.setState({ favorites: [...favorites, name] });
    }
  };

  render() {
    const { input, countries, errorMessage, selectedCountry, favorites } =
      this.state;

    const isFavorite =
      selectedCountry && favorites.includes(selectedCountry.name.common);

    return (
      <div className="boxy">
        <div className="container">
          <p>Search:</p>
          <input value={input} onChange={this.onInput} />

          <ul>
            {countries.map((item) => (
              <li
                key={item.cca3}
                className="list"
                onClick={() => this.select(item)}
              >
                {item.name.common}
              </li>
            ))}
          </ul>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <hr />

          {/* DETAILS SECTION */}
          {selectedCountry && (
            <div className="country-info">
              <img
                src={selectedCountry.flags.png}
                alt={`Flag of ${selectedCountry.name.common}`}
                style={{
                  width: "150px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h2>{selectedCountry.name.common}</h2>
              <p>
                <strong>Capital:</strong>{" "}
                {selectedCountry.capital?.[0] || "N/A"}
              </p>
              <p>
                <strong>Region:</strong> {selectedCountry.region}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {selectedCountry.population.toLocaleString()}
              </p>
              <p>
                <strong>Currency:</strong>{" "}
                {selectedCountry.currencies
                  ? Object.values(selectedCountry.currencies)[0].name
                  : "N/A"}
              </p>
              <div className="fav-button">
                <button
                  onClick={() => {
                    if (selectedCountry) {
                      this.toggleFavorite(selectedCountry.name.common);
                    }
                  }}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://w3.org"
                    viewBox="0 0 16 16"
                    width="32"
                    height="32"
                    /* THIS LINE CHANGES THE COLOR */
                    fill={isFavorite ? "red" : "gray"}
                  >
                    {/* THIS PATH CREATES THE ACTUAL HEART SHAPE */}
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Data from Favs */}
        <Favs favorites={favorites} />
      </div>
    );
  }
}

export default App;
