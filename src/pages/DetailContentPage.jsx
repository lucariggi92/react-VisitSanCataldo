import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CardDetail from "../components/CardDetail"; 

export default function DetailContentPage() {
    const { slug } = useParams(); 
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {

        
        // Chiamata alla rotta GET /api/contents/:slug
        axios.get(`http://localhost:3000/api/contents/${slug}`)
            .then((res) => {
                setItem(res.data);
                setLoading(false);//ho avuto successo dopo il then quindi è terminatp
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.error("Errore nel caricamento:", err);
                setLoading(false); //c'è un errore ma do comuqne una risposta
            });
    }, [slug]);

    if (loading) return (
        <div className="container text-center" style={{ marginTop: "200px" }}>
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Caricamento dettagli...</p>
        </div>
    );

    if (!item) return (
        <div className="container text-center" style={{ marginTop: "300px" }}>
            <h2>Contenuto non trovato</h2>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Torna alla Home</button>
        </div>
    );

    return (
        <div className="container" style={{ marginTop: "180px" }}>
            <button 
                className="btn btn-outline-dark mb-3 rounded-pill px-4" 
                onClick={() => navigate(-1)}
            >
                <i className="bi bi-arrow-left"></i> Torna indietro
            </button>

            {/* Inseriamo il componente CardDetail passandogli l'oggetto item */}
            <CardDetail item={item} />
        </div>
    );
}