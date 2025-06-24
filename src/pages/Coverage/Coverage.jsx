import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

// Custom marker icon
const markerIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

// Component to change map center dynamically
const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 10); // 10 is zoom level
  return null;
};

const Coverage = () => {
  const [allDistricts, setAllDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [centerCoords, setCenterCoords] = useState([23.8103, 90.4125]);

  useEffect(() => {
    fetch("/data/warehouses.json")
      .then((res) => res.json())
      .then((data) => setAllDistricts(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  const handleSearch = () => {
    const key = search.toLowerCase().trim();
    if (!key) {
      alert("Please type a district or city name.");
      return;
    }

    const match = allDistricts.find(
      (item) =>
        item.district.toLowerCase().includes(key) ||
        item.city.toLowerCase().includes(key)
    );

    if (match) {
      setCenterCoords([match.latitude, match.longitude]);
    } else {
      alert("District not found! Try another.");
    }
  };

  const handleReset = () => {
    setSearch("");
    setCenterCoords([23.8103, 90.4125]);
  };

  return (
    <section className="py-16 px-4 md:px-8 rounded-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          We are available in <span className="text-lime-600">64 districts</span>
        </h2>

        {/* Search Box */}
        <div className="flex items-center justify-center w-full max-w-xl mx-auto rounded-full bg-white px-4 py-2 shadow-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by district or city"
            className="flex-grow bg-transparent outline-none text-sm px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-lime-400 hover:bg-lime-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="ml-2 text-sm text-gray-600 hover:underline"
          >
            Reset
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-12 mb-4">
          We deliver almost all over Bangladesh
        </h3>

        {/* Map */}
        <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-md">
          <MapContainer
            center={centerCoords}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            {/* dynamically change center */}
            <ChangeMapView coords={centerCoords} />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            />

            {allDistricts.map((location, index) => (
              <Marker
                key={index}
                position={[location.latitude, location.longitude]}
                icon={markerIcon}
              >
                <Popup>
                  <p className="font-semibold">{location.district}</p>
                  <p className="text-xs text-gray-500">
                    {location.covered_area.join(", ")}
                  </p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
