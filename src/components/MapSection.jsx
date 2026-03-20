import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- FIX ICONE LEAFLET ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapSection() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Coordinate centrali di San Cataldo 
    const centerPosition = [37.488, 14.064];

    useEffect(() => {
        fetch('http://localhost:3000/api/contents') 
            .then(res => res.json())
            .then(data => {
                setResults(data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento dei dati mappa:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center my-5">Caricamento mappa...</div>;

    return (
        <section className="map-section container my-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold ">Esplora San Cataldo</h2>
                <p className="text-muted">Naviga tra i luoghi d'interesse direttamente sulla mappa</p>
            </div>

            <div className="map-wrapper" style={{ 
                height: "500px", 
                width: "100%", 
                borderRadius: "20px", 
                overflow: "hidden", 
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                border: "1px solid #ddd"
            }}>
                <MapContainer 
                    center={centerPosition} 
                    zoom={15} 
                    scrollWheelZoom={false} 
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Filtriamo i risultati: mostriamo il Marker solo se latitudine e longitudine esistono */}
                    {results
                        .filter(item => item.latitude && item.longitude)
                        .map((item) => (
                            <Marker 
                                key={item.id} 
                                position={[item.latitude, item.longitude]}
                            >
                                <Popup>
                                    <div className="popup-content" style={{ width: "180px" }}>
                                        {item.cover_image && (
                                            <img 
                                                src={`http://localhost:3000/img/${item.cover_image}`} 
                                                alt={item.title} 
                                                style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                            />
                                        )}
                                        <h6 className="mt-2 fw-bold" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
                                        <p className="text-muted small mb-2">
                                            {item.category.replace(/-/g, ' ')}
                                        </p>
                                        <Link 
                                            to={`/contents/${item.slug}`} 
                                            className="btn btn-dark btn-sm w-100 text-white"
                                            style={{ borderRadius: "20px", fontSize: "0.8rem" }}
                                        >
                                            Vedi Dettagli
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>
        </section>
    );
}