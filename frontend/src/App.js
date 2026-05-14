import React from "react";
import "./styles.css";
import Favs from "./Favs";

const API_HOST = process.env.REACT_APP_API_HOST;
const API_URL = `${API_HOST}/api/favorites`;

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

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const formattedFavorites = data.map((fav) => ({
        name: { common: fav.common_name },
        flags: { png: fav.flag_png },
        region: fav.region,
        capital: fav.capital ? [fav.capital] : [],
      }));

      this.setState({ favorites: formattedFavorites });
    } catch (err) {
      console.error("Error loading favorites:", err);
    }
  };

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
        `https://restcountries.com/v3.1/name/${input}`,
      );
      const data = await apiCall.json();

      if (Array.isArray(data)) {
        // Store full objects instead of just names
        const filtered = data.filter((st) =>
          st.name.common.toLowerCase().startsWith(input.toLowerCase()),
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

  toggleFavorite = async (country) => {
    const { favorites } = this.state;
    const isAlreadyFav = favorites.find(
      (fav) => fav.name.common === country.name.common,
    );
    try {
      if (isAlreadyFav) {
        await fetch(`${API_URL}/${country.name.common}`, {
          method: "DELETE",
        });

        this.setState({
          favorites: favorites.filter(
            (fav) => fav.name.common !== country.name.common,
          ),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            common_name: country.name.common,
            flag_png: country.flags.png,
            region: country.region,
            capital: country.capital?.[0] || "",
          }),
        });

        this.setState({
          favorites: [...favorites, country],
        });
      }
    } catch (err) {
      console.error("Error updating favorite:", err);
    }
  };
  // toggleFavorite = (name) => {
  //   const favorites = this.state.favorites || [];
  //   if (favorites.includes(name)) {
  //     // Remove from favorites
  //     this.setState({ favorites: favorites.filter((fav) => fav !== name) });
  //   } else {
  //     // Add to favorites
  //     this.setState({ favorites: [...favorites, name] });
  //   }
  // };

  render() {
    const { input, countries, errorMessage, selectedCountry, favorites } =
      this.state;

    const isFavorite =
      selectedCountry &&
      favorites.some((fav) => fav.name.common === selectedCountry.name.common);

    return (
      <div className="boxy">
        <div className="container">
          <div className="search">
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
          </div>

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
                      this.toggleFavorite(selectedCountry);
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

        {favorites.length > 0 && (
          <Favs
            favorites={this.state.favorites}
            toggleFavorite={this.toggleFavorite}
          />
        )}
      </div>
    );
  }
}

export default App;
