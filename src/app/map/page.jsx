"use client";

import React, { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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

const MapPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedMarkers = JSON.parse(localStorage.getItem("marker")) || [];

    const grouped = storedMarkers.reduce((acc, m) => {
      if (!acc[m.category]) {
        acc[m.category] = {
          id: m.category,
          name: m.category,
          visible: true,
          markers: [],
        };
      }

      const [lat, lng] = m.coordinate.split(",").map(Number);

      acc[m.category].markers.push({
        id: m.id,
        lat,
        lng,
      });

      return acc;
    }, {});

    setCategories(Object.values(grouped));
  }, []);

  function getIconPerCategory(name) {
    switch (name) {
      case "Vaches":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 128.3 102.7"
            >
              <path
                className="thm-path"
                d="m35 80.5 2.2-12.2 2.2-12.1-2-2.9-2.5-3.2c-.3-.3-5.7-1.4-6.9-1.4-.3 0-1 1.3-3.7 7.1-3.6 7.9-4 8.4-5.7 8.9l-3.3.2c-2.2 0-2.3 0-3.1-.5-1.6-1-1.7-1.2-4.4-13L5.3 40q.1-.6.8-2 .7-1.2.6-1.4l-1-.7q-1-.5-1.4-1.2c-.7-1.3-.4-3 .7-3.7.2-.2 3.8-1.4 7.9-2.7l7.4-2.3 7.3-6.4q7.3-6.4 8.4-7l1-.5h30.7l40.7.2 10.2.1 1 .6q2 1 3 3l.5 1v9l.1 9.1 1.3 1.3 1.8 2.3c1 2 .2 5.7-1.8 9.3a16 16 0 0 1-2.5 3.7 17 17 0 0 1-2.9-4q-2-3.7-2-6.7c0-1.6.1-2 .6-3l1.3-2 .7-.7V17.5l-.7-.7q-.8-.6-1.5-.7l-.9-.1v28.3l1 5 1 5.2-.7 13.1-.7 13.1h-3.6v-1.2l.9-12.9.7-11.7-1-5-1-5.2V15.8H37.3L35 18 22.6 29.3q-.4.4-6.8 2.3l-6.3 2 1.3.8q1.2.6 1.4 1c.1.1-2.2 3.6-3 4.6-.4.4-.4.5 2 10.8L14 61.4c.2.2 2 0 3.4-.1.6-.1.7-.4 4.4-8.2l3.8-8.2c.2-.2 10.8 1.6 11 1.9l2.7 3.7L42 54h10.2v.8l1.4 25.9h-3.7v-.9l-.3-6.6c-.2-8.9 0-8.9-3-.1L44 80.6h-1.8l-1.8.1 3.8-11.5L48 57.6h-5.3l-4 23-1.8.1q-1.8 0-2-.2m87.7-38q.7-2.3-.5-3.5l-.6-.7-.4.7c-.4.6-.5 1-.4 2.4q0 1.6.6 2.6l.4 1 .3-.6zM55 79.8l1.7-25.6c0-.1 5.5-.2 12.3-.2h12.3l7.4-2 12.8-3.5c.1 0 2.4 2.5 5 5.6l4.8 5.6.4 8.7.5 10.5.2 1.8h-1.8c-1.7 0-1.8 0-1.8-.5l-.1-3.4-.2-3-1.1 3.5-1.1 3.4h-3.6l2.7-8.8c2-6.4 2.6-9 2.6-9.8 0-1.2 0-1-3.5-5.1q-.1-.2-.3-.1l-3.8 23.7-1.7.1h-1.6v-.6l2-13.8a68 68 0 0 0 1.5-13.6c-.2-.3-1.5 0-9.2 2.2l-8.9 2.6H71.3c-10.6 0-11.1 0-11.1.4l-1.5 22.4c0 .4-.2.4-1.8.4H55z"
                style={{
                  fillOpacity: "1",
                  strokeWidth: ".205348",
                }}
              />
            </svg>
          </>
        );
        break;
      case "Taureaux":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 126.4 102.1"
            >
              <path
                className="thm-path"
                d="M110.6 81c-1.8-.1-1.8-.1-1.8-.7l-.1-3.5-.2-3-1.1 3.5-1.2 3.5h-3.7l2.7-9q2.6-8.9 2.6-9.8c0-1 0-1-1.8-3.1-1.7-2.1-1.7-2.2-1.9-1.6l-2 12-1.7 11.6H55v-1l1.7-24.5.1-1.5 12.5.1 12.5.2 6.2-1.8 13.7-3.7 9.3 10.7c.2.3.4 3 .8 10.9l.5 10.5.7.1q.9.1 0 .1zm-13.5-.6 4-27.2-.2-.6q-.2-.3-6.7 1.6l-9 2.4-2.5.6H71.5c-10.9 0-11.3 0-11.3.4l-1.4 22.6v.5H78c15.1 0 19.1 0 19.2-.3m-61.8 0 2-12c1.2-6.5 2.1-12 2-12.2 0-.3-15.1-23-15.7-23.7a42 42 0 0 0-8.4 1.1q-8 1.3-9 1.2-.8 0-1.6-.6C3.4 33.5.7 30.6.4 29.7A5 5 0 0 1 .8 26L15.2 6.3c0-.2-5.6-3.8-6.7-4.2q-.7-.4-.3-1.3c.2-.4.3-.4 9.8-.4 9.2 0 9.6 0 9.8.4.4.7.2 1.3-1 3l-1 1.6L27 5c1.2-.5 1.5-.5 5.6-.5s4.3 0 4.5.4l.2.7-1.9 2.8q-1.7 2.3-1.7 2.6l2.7.7 2.6.7h39.7l39.7.2 1 .4a7 7 0 0 1 3.2 3c.4 1 .4 1 .4 10v9l1 .8c2.5 2.2 2.8 6.2.7 10.7a30 30 0 0 1-3 5.2 31 31 0 0 1-3.6-6q-2.6-6 .6-9.4l.9-1V17.6l-.6-.6c-.5-.5-2-1-2.2-.8v27.5l1 5.5 1 5.5-.8 12.7-.9 13.1c0 .4 0 .5-1.7.5h-1.8v-1l.8-12.7.7-11.8-1-5.2-1-5.1V16.3H40.4l-8-1.8-14.2-3.3 2.3-3.6 2.5-4-2-.1q-1.9 0-2.5-.2-1-.2.7.9l1.3.8q.4.2-8.1 11.7L4 28.4q.1.4 1.3 1.6 1.3 1.3 1.8 1.2c.2 0 4.4-.6 9.2-1.5l8.8-1.4L33.7 41l8.6 12.8h10.2v.9l1.1 24 .1 2h-3.4l-.1-.8-.8-14.4-2.6 7.6-2.5 7.7h-4.5c-4.3 0-4.5 0-4.5-.4m9-11L48 57.6c0-.3-.3-.3-2.6-.3q-2.6 0-2.6.2c-.2.4-4 22.4-4 22.8q0 .3.9.2h.8zm78.2-26.2c.6-1.9.6-2.8 0-4l-.7-.8-.5.9c-.4.7-.4 1-.4 2.5.1 1.5.7 3.3 1 3zM31.1 8.3q.3-.4-.7-.3c-1 0-3.8 1-3.5 1.2l1.5.5 1.3.3.6-.7z"
                style={{
                  display: "inline",
                  fillOpacity: "1",
                  strokeWidth: ".204212",
                }}
              />
            </svg>
          </>
        );
        break;
      case "Béliers":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 126.4 102.1"
            >
              <path
                className="thm-path"
                d="M43 80.5q-1.4 0-1.5-.2L45 60.2l-1.7-.9a13 13 0 0 1-5.5-5.3c-.6-1.3-.9-1.5-1.8-2a8 8 0 0 1-3.6-7.9q.1-1.2.4-1.8c.3-.6.3-.6-.3-1.2-.3-.3-.9-1.2-1.2-1.9a5 5 0 0 1-.7-3l.2-2.1.1-.6h-2l-2.9-.2q-3-1.2-3.4-4.4c-.1-2 .2-2.6 4-6.2 5.8-5.3 6.7-5.9 9.5-6.4l1.2-.3.6-1.4c1.6-3.9 5.1-6.8 9.5-7.9 4.2-1 8.2 0 11.1 2.9 4.8 4.8 4.4 12.4-.9 16q-1.3.8-.6.6l2.5-.2c1.9 0 2 0 3.4.8l1.5.7 1-.8a11 11 0 0 1 5.2-2c2.5-.1 5.3.8 7 2.3l.8.7 1.5-.4q4.6-1.6 10.3-.1A19 19 0 0 1 104 41.7c.6 3 .2 4.5-1.4 5.5l-1 .6v8.8l1.2 1.5 1.3 1.5-1.5 10-1.6 10.6c0 .4-.2.5-1.5.5H98l.1-.6 1.5-10 1.3-9.6-1.2-1.5-1.3-1.4V44.7h1.3c1.5 0 1.5-.1 1.2-2a16 16 0 0 0-12-13q-6.8-1.8-10.5 1.4l-.7.8-1.3-1.5c-1-1-1.6-1.6-2.6-2-1.2-.6-1.4-.7-3-.6-2.5.1-3.8.8-5.6 2.7L64 32l-.4-.6q-2-2.5-4.5-2.5-2.9 0-5 2.6-.6 1-1 1l-1.5-2.9C50 27 50 27 48.9 26.3q-2.4-1.1-3.5-3.6c-.5-1-.6-1.4-.6-2.9 0-1.6 0-1.8.7-3a7 7 0 0 1 6-3.6 6 6 0 0 1 4.9 3c1.4 3-.5 6.7-3.6 7l-1 .1V22c0-1.3.1-1.5.5-1.5q.4 0 1-.5c1.3-1.3.6-3.5-1.2-4-2.2-.6-4.6 1.8-4.2 4.2.2 1 1.3 2.7 2.1 3.4 3.8 2.7 9.5-.9 9.5-5.9 0-3.2-2-6.2-5.2-7.7-2.4-1-5.7-1-8.6.5-1.6.7-3.9 3-4.7 4.8-.6 1.4-1.2 3.6-1.2 4.9v.7H37v-1c0-1.2-.2-1.3-1.8-.5a70 70 0 0 0-9.6 8.7c-.3.7 0 1.8.6 2.3.4.4.8.4 5.6.5H37l-1.5 1.7c-1.7 1.9-2 2.4-2 3.7q0 2.6 2.8 4.2l1 .6q0 .1-.7 1l-1 1.6a6 6 0 0 0 .1 3.9c.5 1 2 2.5 3.1 2.8.7.2.8.3 1.1 1.2.5 1.4 1.8 3.2 2.8 4.1L45 57c1.2.6 1.7.7 3.7.8H51l2.3 4.7 2.3 4.6.5 6.6.6 6.7-3 .2c-3.5.1-8.4 0-8.4-.4l2.2-9.2c1.9-7.9 2-9 1.9-9.6q-.2-.8-.8-.7-.5 0-.6.2l-3.6 19q-.1.6.4.6zm10.7-.5-.5-6.1c-.5-5.2-.6-5.8-1-6.8q-.6-1-.7-.8l-3.3 14a9 9 0 0 0 2.8.2c2.7 0 2.7 0 2.7-.5m5.3.5h-1.5l.2-1.5.4-6.7.3-5.1 2-4.6 2-4.8 1.2.2a22 22 0 0 0 11 2.2c3.3-.2 5.2-.6 8.6-2l1-.4 6.4 4.6 6.3 4.5v6.9l.1 6.9h-2.9V68.5l-1.5-1-1.6-1.1-1.5 7.1-1.4 7-1.4.1c-1.2 0-1.3 0-1.3-.3s.6-3.8 1.5-7.9l1.5-7.7c0-.2-1-1-2.1-2L84 61.3l-1.8.5-2.6.8-.9.2 3 2.2L85 67a148 148 0 0 1-.8 13.3q0 .3-1.3.3-1.5.1-1.3-.4l.8-11.4c0-.4-.8-1-3.7-3L75 63.3H73c-2.2 0-4.9-.4-7.2-1.2q-2-.7-2-.4l-1.4 3.2-1.2 3-.3 5-.5 6.3-.1 1.3H73 59"
                style={{
                  display: "inline",
                  strokeWidth: ".204212",
                }}
              />
            </svg>
          </>
        );
        break;
      case "Brebis":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 126.4 102.1"
            >
              <path
                className="thm-path"
                d="m96.7 80.7-1.5-.2h-1.5V68.3l-1.2-.9q-1.7-1.2-1.6-.6L88.3 80c0 .5-.1.5-3.7.5h-3.5v-1.2L82 69c0-.5-.3-.8-3.5-3.1l-3.5-2.6h-2q-3.6 0-7-1.1-1.3-.5-1.6-.4L63 65l-1.2 3-.3 6.2-.4 6.3-3.4.1c-3.2 0-3.3 0-3.4-.3l-.5-6.2c-.4-5.5-.5-5.7-1-7l-.7-1.2-1.7 7-1.8 7.5c-.1.3-.5.4-3.5.4q-3.3 0-3.3-.3L45.2 61c.1-.4 0-.5-1.6-1.4a14 14 0 0 1-5.7-5.4q-.7-1.5-1.4-1.7c-1-.4-2.6-2.2-3.1-3.4q-1.4-3-.4-6l.3-1-.7-.9a8 8 0 0 1-1.5-6.5l.2-.8h-2.7c-2.9 0-3.9-.3-4.7-1.3a6 6 0 0 1-1-4c.2-1.9.8-2.6 5.5-6.7 6.6-5.9 6.4-5.8 16-5.7 6 0 6.4 0 6.8.4q1 .8-.3 2.9l-.8 1.2 1.8 3.1 2 3.3q0 .3 1.5-.4c2.5-1.1 5.7-1 7.8.4l.7.5.8-.6c3.6-2.9 9.3-2.8 12.4 0 .9.8.9.8 1.5.5A19 19 0 0 1 103 40.8q1.2 5-1.2 6.4l-.7.4v9l1 1.4.8 1.4-1.1 10.5-1.2 10.5H99q-1.4 0-1.7.3t-.6 0m-51.2-.8c2-8 4.4-18.4 4.3-18.7q-.2-.3-.8-.3c-.5 0-.6 0-.8 1l-3.5 18.3c0 .5.6.3.8-.3m52-.2 1.2-10 1-9.2-.8-1.3L98 58V45h1.2c1.4 0 1.3 0 1.3-1.3a15 15 0 0 0-4-8.6c-3.3-3.6-7.9-5.5-12.8-5.3-2 0-2.5.1-3.5.6-.7.3-1.6.9-1.9 1.3l-.6.7-.9-1.2a7 7 0 0 0-5.8-3.1q-3.9 0-6.4 3.6l-.5.6-1.1-1.2c-2-1.9-3.4-2.3-5.5-1.7-1 .3-1.4.6-2.6 1.7l-1.4 1.4-3.1-5.3-3.4-5.8q-.4-.4.3-1.4l.5-1-5.5.1-5.4.1-1.2.6c-1.1.5-9 7.3-9.5 8.1-.3.5-.3 1.8-.1 2.6v.4h11.3L36 32.5l-1.7 2.3c-1 2.2 0 4.7 2.5 6l1 .5-.6.6c-1.6 1.7-2 4-1.2 6a4 4 0 0 0 3 2.5q.6-.1 1 1.1a10 10 0 0 0 4.8 5.5q2 1 5.5 1h1.3l2.2 4.7 2.3 4.8.5 6c.5 6.8.5 6.8 1 6.8s.5-.6.8-7.8l.2-5 2.1-5 2-5 .7.4c1.5 1.3 4.6 2.3 8 2.7q4.4.6 11-1.6l2-.7 6 4.5 6.2 4.5v6.6c0 6.3 0 6.6.4 6.6q.4 0 .5-.8m-10.7-7.3c.9-4.3 1.6-7.9 1.5-8l-2.2-1.8-2.1-1.5-2.4.8c-2.1.7-2.3.8-2 1 .2.3 4.3 3.2 5.5 4l-.3 6.4c-.6 7.7-.6 7 0 7 .4-.1.5-.7 2-8"
                style={{
                  display: "inline",

                  fillOpacity: "1",
                  strokeWidth: ".204212",
                }}
              />
            </svg>
          </>
        );
        break;
      case "Véhicule":
        return (
          <>
            <i className="bi bi-car-front-fill fs-3"></i>
          </>
        );
        break;
      case "Ressources":
        return (
          <>
            <i className="bi bi-database-fill fs-3"></i>
          </>
        );
        break;
      case "Stockage":
        return (
          <>
            <i className="bi bi-box-seam fs-3"></i>
          </>
        );
        break;
      case "Capteurs":
        return (
          <>
            <i className="bi bi-wifi fs-3"></i>
          </>
        );
        break;
    }
  }

  const createHtmlIcon = (label) =>
    L.divIcon({
      className: "",

      html: renderToStaticMarkup(
        <div
          className="rounded-circle thm-bg"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "40px",
            height: "40px",
          }}
        >
          <div className="mx-auto my-auto">
            {getIconPerCategory(label)}
            {/*<span>{label}</span>*/}
          </div>
        </div>
      ),

      iconSize: [100, 100],
      iconAnchor: [0, 0],
    });

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c))
    );
  };

  return (
    <div className="thm-bg-dark p-4">
      {/* LEFT: CONTROLS */}
      <div className="container thm-bg-light p-3 rounded-3 thm-shadow-m">
        <div className="row">
          {categories.map((c) => (
            <div key={c.id} className="col-lg-3 col-md-4 col-sm-12">
              <div className="form-check form-switch d-flex align-items-center justify-content-between">
                {getIconPerCategory(c.name)}
                <label className="form-check-label mb-0">{c.name}</label>
                <input
                  className="form-check-input thm-bg-primary ms-3"
                  type="checkbox"
                  checked={c.visible}
                  onChange={() => toggleCategory(c.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: MAP */}
      <div className="container thm-bg-light rounden-2 p-3 thm-shadow-m mt-4">
        <div style={{ height: "70vh", width: "100%" }} className="mx-auto mt-3">
          <MapContainer
            center={CENTER}
            zoom={30}
            style={{ height: "100%", width: "100%" }}
          >
            {/* 🛰️ ESRI SATELLITE */}
            <TileLayer
              attribution="Tiles © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            {categories.map(
              (c) =>
                c.visible &&
                c.markers.map((m) => (
                  <Marker
                    key={m.id}
                    position={[m.lat, m.lng]}
                    icon={createHtmlIcon(c.name)}
                  >
                    <Popup>
                      <strong>{c.name}</strong>
                      <br />
                      Lat: {m.lat.toFixed(5)}
                      <br />
                      Lng: {m.lng.toFixed(5)}
                    </Popup>
                  </Marker>
                ))
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
