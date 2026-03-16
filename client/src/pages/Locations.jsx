import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/locationsAPI";
import { Link } from "react-router-dom";
import "../css/Locations.css";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    })();
  }, []);

  return (
    <div className="available-locations">
      <h2>Arcade Bar Locations</h2>
      <ul className="locations-list">
        {locations.map((location) => (
          <li key={location.id} className="location-item">
            <Link to={`/locations/${location.id}`}>
              <h3>{location.name}</h3>
              <p>{location.city}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Locations;
