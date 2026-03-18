import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventsByLocationSlug } from "../services/eventsAPI";

const LocationEvents = () => {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    getEventsByLocationSlug(slug).then((eventsData) => {
      if (eventsData.length > 0) {
        setLocationName(eventsData[0].location_name);
      }
      setEvents(
        eventsData.map((event) => ({
          ...event,
          timeRemaining: calculateTimeRemaining(event.event_date),
        }))
      );
    });
  }, [slug]);

  const calculateTimeRemaining = (eventDate) => {
    const now = Date.now();
    const eventTime = new Date(eventDate).getTime();
    const diff = eventTime - now;

    if (diff <= 0) return "Event has passed";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

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
        <Link
          to="/locations"
          style={{
            display: "inline-block",
            backgroundColor: "white",
            color: "#1098ad",
            padding: "15px 30px",
            textDecoration: "none",
            fontWeight: "bold",
            border: "3px solid #1098ad",
            marginBottom: "40px",
          }}
        >
          ← Back to All Arcades
        </Link>

        <h1
          style={{
            color: "#1098ad",
            fontSize: "40px",
            fontStyle: "italic",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          {locationName}
        </h1>

        <div>
          {events.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "40px",
                border: "5px solid #1098ad",
                textAlign: "center",
              }}
            >
              <h3>No events yet!</h3>
              <p>Check back soon 🎮</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                style={{
                  backgroundColor: "white",
                  padding: "40px",
                  marginBottom: "30px",
                  border: "5px solid #1098ad",
                  borderRadius: "10px",
                }}
              >
                <h3
                  style={{
                    color: "#1098ad",
                    fontSize: "30px",
                    marginBottom: "20px",
                  }}
                >
                  {event.title}
                </h3>
                <p style={{ fontSize: "20px", marginBottom: "20px" }}>{new Date(event.event_date).toLocaleString()}</p>
                <div
                  style={{
                    backgroundColor: event.timeRemaining === "Event has passed" ? "#ccc" : "#1098ad",
                    color: "white",
                    padding: "20px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  {event.timeRemaining}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationEvents;
