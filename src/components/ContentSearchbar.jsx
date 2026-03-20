import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom"; 
import CardContents from "./CardContents";

export default function ContentSearchbar() {
    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams();
    const [totalResults, setTotalResults] = useState(0);
    
    // Legge il parametro 'search' dall'indirizzo e || come valore di fallback e retituisce una stringa vuota
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        // Chiamiamo il backend passando il parametro search
        axios.get(`http://localhost:3000/api/contents?search=${searchQuery}`)
            .then((res) => {
                // Il tuo backend restituisce l'oggetto con la proprietà 'results'
                setItems(res.data.results);
                setTotalResults(res.data.total);
                 window.scrollTo(0, 0);
            })
            .catch((err) => console.error("Errore durante la ricerca:", err));
            
    }, [searchQuery]); // Riesegue quando cambia la parola cercata


    return (
        <div className="container" style={{ marginTop: "180px" }}>
            <h1 className="my-1 text-center">
                {searchQuery ? `Hai cercato: "${searchQuery}"` : ""}
            </h1>
          {searchQuery && (
                    <p className="text-center">
                        <strong>{totalResults}</strong> {totalResults === 1 ? "risultato" : "risultati"}
                    </p>
                )}
            
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-4">
                {items.length > 0 ? (
                    items.map((i) => (
                        <CardContents 
                            key={i.id}
                            title={i.title}
                            slug={i.slug}
                            cover_image={`http://localhost:3000/images/${i.cover_image}`}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted text-center">Nessun risultato trovato per la tua ricerca.</p>
                    </div>
                )}
            </div>
        </div>
    );
}