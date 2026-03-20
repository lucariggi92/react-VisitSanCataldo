import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CardDetail.css";

const defaultMarkerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export default function CardDetail({ item }) {
    const imgBaseUrl = "http://localhost:3000";
    
    // --- REINSERITE LE TUE VARIABILI ORIGINALI ---
    const [mainImage, setMainImage] = useState(item.images?.[0]?.url || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    // Reinserito il tuo useEffect originale per aggiornare l'immagine se cambia l'item
    useEffect(() => {
        const firstImg = item.images?.[0]?.url || "";
        setMainImage(firstImg);
        setActiveIndex(0);
        // Resetta lo scroll all'inizio se cambia l'item
        if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, [item.images]);

    // Gestione dello scroll per i pallini (Mobile)
    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;
        const width = container.offsetWidth;
        const index = Math.round(container.scrollLeft / width);
        setActiveIndex(index);
        // Aggiorniamo anche mainImage per coerenza col tuo stato originale
        if (item.images?.[index]) {
            setMainImage(item.images[index].url);
        }
    };

    // Funzione per scrollare all'immagine quando si clicca una thumbnail (Desktop)
    const scrollToImage = (imgUrl, index) => {
        setMainImage(imgUrl);
        setActiveIndex(index);
        const container = scrollRef.current;
        if (container) {
            container.scrollTo({
                left: container.offsetWidth * index,
                behavior: "smooth"
            });
        }
    };

    const handleImageError = (e) => {
        e.target.src = "/placeholder.jpg";
    };

    // --- LOGICA MAPPA, FOOD, EVENTS (INVARIATA) ---
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
        const food = item.food;
        if (!food || (Array.isArray(food) && food.length === 0)) return null;
        const dishes = Array.isArray(food) ? food : [food];
        return (
            <div className="mt-5">
                <h3 className="fw-bold mb-4"><i className="fas fa-utensils me-2"></i> Ricetta</h3>
                {dishes.map((dish, idx) => (
                    <div key={dish.id || idx} className="mb-4 p-4 border rounded-4 shadow-sm">
                        {dish.recipe && <h4 className=" mb-3">{dish.recipe}</h4>}
                        {dish.ingredients && <p className="small mb-2"><strong>Ingredienti:</strong> {dish.ingredients}</p>}
                        {dish.where_to_eat && <p className="small mb-2"><strong>Dove mangiare:</strong> {dish.where_to_eat}</p>}
                        {dish.season && <p className="small mb-2"><strong>Stagione:</strong> {dish.season}</p>}
                        {dish.pairing && <p className="small mb-0"><strong>Abbinamenti:</strong> {dish.pairing}</p>}
                    </div>
                ))}
            </div>
        );
    };

    const renderEventsSection = () => {
        const events = item.events || [];
        if (!events.length) return null;
        const fmtDate = (d) => {
            try { return new Date(d).toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" }); }
            catch { return d; }
        };
        return (
            <div className="mt-5">
                <h3 className="fw-bold mb-4"><i className="fas fa-calendar-alt me-2"></i> Eventi correlati</h3>
                {events.map((ev, idx) => (
                    <div key={ev.id || idx} className="mb-3 p-4 border rounded-4 shadow-sm">
                        <h5 className="fw-bold mb-2">{ev.location || `Evento ${idx + 1}`}</h5>
                        {ev.date && <p className="small text-muted mb-2"><strong>Data:</strong> {fmtDate(ev.date)}</p>}
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
                <h3 className="fw-bold mb-4"><i className="fas fa-route me-2"></i> Itinerario correlato</h3>
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
                {item.images && item.images.length > 0 && (
                    <div className="col-lg-7">
                        <div 
                            className="main-image-viewport mb-3" 
                            ref={scrollRef}
                            onScroll={handleScroll}
                        >
                            {item.images.map((img, index) => (
                                <img
                                    key={img.id || index}
                                    src={`${imgBaseUrl}${img.url}`}
                                    alt={item.title}
                                    onError={handleImageError}
                                />
                            ))}
                        </div>

                        {/* Pallini (Solo Mobile) */}
                        <div className="d-flex d-md-none justify-content-center gap-2 mb-4">
                            {item.images.map((_, i) => (
                                <span 
                                    key={i} 
                                    className={`dot ${i === activeIndex ? "active" : ""}`}
                                ></span>
                            ))}
                        </div>

                        {/* Thumbnails (Solo Desktop) */}
                        <div className="d-none d-md-flex gap-2 flex-wrap">
                            {item.images.map((img, index) => (
                                <img
                                    key={img.id || index}
                                    src={`${imgBaseUrl}${img.url}`}
                                    className={`img-thumbnail rounded-3 ${mainImage === img.url ? "border-primary shadow-sm" : ""}`}
                                    style={{ width: "120px", height: "90px", objectFit: "cover", cursor: "pointer" }}
                                    alt={img.caption || `Galleria ${index + 1}`}
                                    onClick={() => scrollToImage(img.url, index)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className={item.images && item.images.length > 0 ? "col-lg-5" : "col-12"}>
                    <div className="p-4 bg-white rounded-4 shadow-sm border">
                        <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase">
                            {item.category}
                        </span>
                        <h1 className="fw-bold mb-4">{item.title}</h1>
                         {item.reading_time && (
                            <p className="text-muted small mb-3">
                                <i className="fas fa-clock me-1"></i> Tempo di lettura: {item.reading_time} minuti
                            </p>
                        )}
                        <p className="text-secondary mb-4" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                            {item.description}
                        </p>
                       
                        {item.video_url && (
                            <div className="mb-4">
                                <iframe
                                    width="100%" height="200" src={item.video_url}
                                    title={item.title} allowFullScreen
                                    className="rounded-3"
                                ></iframe>
                            </div>
                        )}
                        {item.tag && (
                            <div className="tags-container pt-3 border-top">
                                <span className="d-block small text-muted mb-2">TAG CORRELATI</span>
                                <div className="d-flex flex-wrap gap-2">
                                    {item.tag.split(",").map((t, i) => (
                                        <span key={i} className="badge border text-dark fw-normal">{t.trim()}</span>
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