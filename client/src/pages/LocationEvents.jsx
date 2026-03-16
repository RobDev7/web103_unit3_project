import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LocationsAPI from "../services/locationsAPI";
import EventsAPI from "../services/eventsAPI";
import "../css/LocationEvents.css";

const LocationEvents = () => {
  const { id } = useParams(); // Get location ID from URL
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadLocationData() {
      try {
        const locationData = await LocationsAPI.getLocationById(id);
        const eventsData = await EventsAPI.getEventsByLocationId(id);

        setLocation(locationData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading location data:", error);
      }
    }
    loadLocationData();
  }, [id]);

  if (!location) return <div className="loading">Loading events...</div>;

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <div className="placeholder-image">🕹️ {location.name}</div>
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.city}</p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>{new Date(event.date_time).toLocaleString()}</strong>
              </p>
            </div>
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i> No events scheduled at {location.name} yet!
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
