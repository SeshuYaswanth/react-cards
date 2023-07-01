import React, { useState, useEffect } from "react";
import "./CardListing.css";
import data from "./data.json";

const CardListing = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filter, setFilter] = useState("Your");

  useEffect(() => {
    const mockApiResponse = data;
    setCards(mockApiResponse.data);
    setFilteredCards(
      mockApiResponse.data.filter((card) => card.owner_id === 1)
    );
  }, []);

  const handleTabClick = (tab) => {
    setFilter(tab);
    setFilteredCards(
      cards.filter((card) => {
        if (tab === "all") {
          return true;
        } else {
          return card.card_type.toLowerCase() === tab.toLowerCase();
        }
      })
    );
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setFilteredCards(
      cards.filter((card) => card.name.toLowerCase().includes(searchQuery))
    );
  };

  return (
    <div className="card-listing">
      <div className="tabs">
        <button
          className={`tab ${filter === "Your" ? "active" : ""}`}
          onClick={() => handleTabClick("Your")}
        >
          Your
        </button>
        <button
          className={`tab ${filter === "all" ? "active" : ""}`}
          onClick={() => handleTabClick("all")}
        >
          All
        </button>
        <button
          className={`tab ${filter === "burner" ? "active" : ""}`}
          onClick={() => handleTabClick("burner")}
        >
          Burner
        </button>
        <button
          className={`tab ${filter === "subscription" ? "active" : ""}`}
          onClick={() => handleTabClick("subscription")}
        >
          Subscription
        </button>
      </div>
      

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by card name..."
          onChange={handleSearch}
        />
      </div>

      <div className="card-container">
        {filteredCards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-type">{card.card_type}</div>
            <div className="card-details">
              <h3>{card.name}</h3>
              <p>{card.budget_name}</p>
              <p>{card.Amount}</p>
              <p>{card.frequency}</p>
              <p>{card.limit}</p>
            </div>
            <div className="card-financials">
              <div className="card-spent">
                <p>
                  Spent: {card.spent.value} {card.spent.currency}
                </p>
                <p>
                  Balance: {card.available_to_spend.value} {card.spent.currency}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardListing;
