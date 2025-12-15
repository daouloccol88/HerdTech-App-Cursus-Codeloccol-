"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CENTER = [13.495344113294335, 2.109491190281782];

// generate random nearby points
const generateMarkers = () => {
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    lat: CENTER[0] + (Math.random() - 0.5) * 0.02,
    lng: CENTER[1] + (Math.random() - 0.5) * 0.02,
    visible: true,
  }));
};

const MapPage = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(generateMarkers());
  }, []);

  const toggleMarker = (id) => {
    setMarkers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m))
    );
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* LEFT: CONTROLS */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header fw-semibold">🎛️ Marker Visibility</div>
            <div className="card-body">
              {markers.map((m) => (
                <div key={m.id} className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={m.visible}
                    onChange={() => toggleMarker(m.id)}
                  />
                  <label className="form-check-label">Marker {m.id}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: MAP */}
        <div className="col-md-9">
          <div style={{ height: "50vh", width: "100%" }}>
            <MapContainer
              center={CENTER}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              {/* 🛰️ ESRI SATELLITE */}
              <TileLayer
                attribution="Tiles © Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />

              {markers.map(
                (m) =>
                  m.visible && (
                    <Marker key={m.id} position={[m.lat, m.lng]}>
                      <Popup>
                        <strong>Marker {m.id}</strong>
                        <br />
                        Lat: {m.lat.toFixed(5)}
                        <br />
                        Lng: {m.lng.toFixed(5)}
                      </Popup>
                    </Marker>
                  )
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
