import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CardDetail.css" 

const defaultMarkerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export default function CardDetail({ item }) {
    const imgBaseUrl = "http://localhost:3000";
    const [mainImage, setMainImage] = useState(item.images?.[0]?.url || "");

    useEffect(() => {
        setMainImage(item.images?.[0]?.url || "");
    }, [item.images]);

    const handleImageError = (e) => {
        e.target.src = "/placeholder.jpg";
    };

    const points = item.points_of_interest || [];
    const hasPoints = points.length > 0 && points.some((p) => p.latitude && p.longitude);

    const mapCenter = useMemo(() => {
        if (!hasPoints) return [37.488, 14.064];
        const valid = points.filter((p) => p.latitude && p.longitude);
        const avgLat = valid.reduce((sum, p) => sum + parseFloat(p.latitude), 0) / valid.length;
        const avgLon = valid.reduce((sum, p) => sum + parseFloat(p.longitude), 0) / valid.length;
        return [avgLat, avgLon];
    }, [hasPoints, points]);

    const renderMapSection = () => {
        if (!hasPoints) return null;
        return (
            <div className="mt-5">
                <h3 className="fw-bold mb-4">
                    <i className="fas fa-map-marked-alt me-2"></i> Mappa punti di interesse
                </h3>
                <div className="mb-4" style={{ height: "380px", width: "100%" }}>
                    <MapContainer center={mapCenter} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {points
                            .filter((p) => p.latitude && p.longitude)
                            .map((poi) => (
                                <Marker
                                    key={poi.id || `${poi.latitude}-${poi.longitude}`}
                                    position={[parseFloat(poi.latitude), parseFloat(poi.longitude)]}
                                    icon={defaultMarkerIcon}
                                >
                                    <Popup>
                                        <div style={{ minWidth: "180px" }}>
                                            <strong>{poi.address || "Punto di interesse"}</strong>
                                            {poi.latitude && poi.longitude && (
                                                <div className="small text-muted">
                                                    Lat: {poi.latitude}, Lon: {poi.longitude}
                                                </div>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                    </MapContainer>
                </div>
            </div>
        );
    };

    const renderFoodSection = () => {
        console.log("DEBUG: item.food =", item.food); // Debug
        const food = item.food;
        if (!food || (Array.isArray(food) && food.length === 0)) return null;

        // Se food è un oggetto singolo (dal backend)
        const dishes = Array.isArray(food) ? food : [food];

        return (
            <div className="mt-5">
                <h3 className="fw-bold mb-4">
                    <i className="fas fa-utensils me-2"></i> Specialità locali
                </h3>
                {dishes.map((dish, idx) => (
                    <div key={dish.id || idx} className="mb-4 p-4 border rounded-4 shadow-sm">
                        <h5 className="fw-bold mb-2">{dish.title || dish.name || `Piatto ${idx + 1}`}</h5>
                        {dish.recipe && (
                            <>
                                <h6 className="small text-muted mb-1">Ricetta</h6>
                                <p className="small mb-3">{dish.recipe}</p>
                            </>
                        )}
                        {dish.ingredients && (
                            <p className="small mb-2">
                                <strong>Ingredienti:</strong> {dish.ingredients}
                            </p>
                        )}
                        {dish.where_to_eat && (
                            <p className="small mb-2">
                                <strong>Dove mangiare:</strong> {dish.where_to_eat}
                            </p>
                        )}
                        {dish.season && (
                            <p className="small mb-2">
                                <strong>Stagione:</strong> {dish.season}
                            </p>
                        )}
                        {dish.pairing && (
                            <p className="small mb-0">
                                <strong>Abbinamenti:</strong> {dish.pairing}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderEventsSection = () => {
        const events = item.events || [];
        if (!events.length) return null;

        const fmtDate = (d) => {
            try {
                return new Date(d).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            } catch {
                return d;
            }
        };

        return (
            <div className="mt-5">
                <h3 className="fw-bold mb-4">
                    <i className="fas fa-calendar-alt me-2"></i> Eventi correlati
                </h3>
                {events.map((ev, idx) => (
                    <div key={ev.id || idx} className="mb-3 p-4 border rounded-4 shadow-sm">
                        <h5 className="fw-bold mb-2">{ev.location || `Evento ${idx + 1}`}</h5>
                        {ev.date && (
                            <p className="small text-muted mb-2">
                                <strong>Data:</strong> {fmtDate(ev.date)}
                            </p>
                        )}
                        {ev.location && <p className="small text-secondary mb-0">Luogo: {ev.location}</p>}
                    </div>
                ))}
            </div>
        );
    };

    const renderItinerarySection = () => {
        const itineraryItems = item.itineraries || [];
        if (!itineraryItems.length) return null;

        return (
            <div className="mt-5">
                <h3 className="fw-bold mb-4">
                    <i className="fas fa-route me-2"></i> Itinerario correlato
                </h3>
                <div className="list-group">
                    {itineraryItems.map((it, idx) => (
                        <div key={it.itinerary_id || idx} className="list-group-item">
                            <h6 className="fw-bold mb-1">{it.itinerary_title || `Tappa ${idx + 1}`}</h6>
                            {it.itinerary_slug && <p className="small mb-0">Slug: {it.itinerary_slug}</p>}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="card-detail-wrapper animate__animated animate__fadeIn">
            <div className="row">
                {/* Sezione Immagini - Solo se presenti */}
                {item.images && item.images.length > 0 && (
                    <div className="col-lg-8">
                        <div className="main-image-viewport mb-3">
                            <img
                                src={`${imgBaseUrl}${mainImage}`}
                                alt={item.title}
                                className="img-fluid rounded-4 shadow-lg w-100"
                                style={{ maxHeight: "600px", objectFit: "cover" }}
                              
                            />
                        </div>
                        {/* Gallery Thumbnails */}
                        <div className="d-flex gap-2 flex-wrap">
                            {item.images.map((img, index) => (
                                <img
                                    key={img.id || index}
                                    src={`${imgBaseUrl}${img.url}`}
                                    className={`img-thumbnail rounded-3 ${mainImage === img.url ? "border-primary" : ""}`}
                                    style={{ width: "120px", height: "90px", objectFit: "cover", cursor: "pointer" }}
                                    alt={img.caption || `Galleria ${index + 1}`}
                                    onClick={() => setMainImage(img.url)}
                               
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Sezione Testi - Adatta colonna se no immagini */}
                <div className={item.images && item.images.length > 0 ? "col-lg-4" : "col-12"}>
                    <div className="p-4 bg-white rounded-4 shadow-sm border">
                        <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase">
                            {item.category}
                        </span>
                        <h1 className="fw-bold mb-4">{item.title}</h1>
                        <p className="text-secondary mb-4" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                            {item.description}
                        </p>
                        {item.reading_time && (
                            <p className="text-muted small mb-3">
                                <i className="fas fa-clock me-1"></i> Tempo di lettura: {item.reading_time} minuti
                            </p>
                        )}
                        {item.video_url && (
                            <div className="mb-4">
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={item.video_url}
                                    title={item.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-3"
                                ></iframe>
                            </div>
                        )}
                        {item.tag && (
                            <div className="tags-container pt-3 border-top">
                                <span className="d-block small text-muted mb-2">TAG CORRELATI</span>
                                <div className="d-flex flex-wrap gap-2">
                                    {item.tag.split(",").map((t, i) => (
                                        <span key={i} className="badge border text-dark fw-normal">#{t.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {renderMapSection()}
            {renderEventsSection()}
            {renderFoodSection()}
            {renderItinerarySection()}
        </div>
    );
}