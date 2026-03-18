import React, { useState, useEffect } from "react";
import { getAllLocations } from "../services/locationsAPI";
import { Link } from "react-router-dom";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations().then(setLocations);
  }, []);

  return (
    <div
      style={{
        borderTop: "10px solid #1098ad",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <div
        style={{
          width: "800px",
          margin: "0 auto",
          padding: "20px 40px",
        }}
      >
        <h1
          style={{
            color: "#1098ad",
            fontSize: "48px",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          🕹️ US Arcade Bars
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {locations.map((location) => (
            <Link
              key={location.id}
              to={`/locations/${location.slug}`}
              style={{
                display: "block",
                backgroundColor: "white",
                padding: "40px",
                border: "5px solid #1098ad",
                textDecoration: "none",
                color: "#1098ad",
                fontSize: "24px",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "orangered";
                e.target.style.color = "orangered";
                e.target.style.backgroundColor = "#f7f7f7";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "#1098ad";
                e.target.style.color = "#1098ad";
                e.target.style.backgroundColor = "white";
              }}
            >
              {location.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
