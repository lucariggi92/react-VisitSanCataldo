import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom"; 
import CardContents from "./CardContents";

export default function ContentSearchbar() {
    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams();
    
    // Legge il parametro 'search' dall'indirizzo (es: /risultati?search=pasticceria)
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        // Chiamiamo il backend passando il parametro search
        axios.get(`http://localhost:3000/api/contents?search=${searchQuery}`)
            .then((res) => {
                // Il tuo backend restituisce l'oggetto con la proprietà 'results'
                setItems(res.data.results);
            })
            .catch((err) => console.error("Errore durante la ricerca:", err));
            
    }, [searchQuery]); // Riesegue quando cambia la parola cercata

    return (
        <div className="container" style={{ marginTop: "150px" }}>
            <h1 className="my-4 text-center">
                {searchQuery ? `Risultati: "${searchQuery}"` : ""}
            </h1>
            
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mb-4">
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
                        <p className="text-muted">Nessun risultato trovato per la tua ricerca.</p>
                    </div>
                )}
            </div>
        </div>
    );
}