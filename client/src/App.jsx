import { Routes, Route } from "react-router-dom";
import Locations from "./pages/Locations.jsx";
import LocationEvents from "./pages/LocationEvents.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Locations />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/:slug" element={<LocationEvents />} />
    </Routes>
  );
}

export default App;
