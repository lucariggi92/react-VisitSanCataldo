import { useState, useEffect } from "react";

import axios from "axios";

import { useSearchParams } from "react-router-dom";

import CardContents from "./CardContents";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function ContentSearchbar() {

    const [items, setItems] = useState([]);

    const [itineraries, setItineraries] = useState([]);

    const [totalResults, setTotalResults] = useState(0);

    const [searchParams] = useSearchParams();

   

    const searchQuery = searchParams.get("search") || "";



    useEffect(() => {

        const fetchAllData = async () => {

            try {

                const [resContents, resItineraries] = await Promise.all([

                    axios.get(`${API_URL}/api/contents?search=${searchQuery}`),

                    axios.get(`${API_URL}/api/itineraries?search=${searchQuery}`)

                ]);



                setItems(resContents.data.results);

                setItineraries(resItineraries.data.results);

                setTotalResults(resContents.data.total + resItineraries.data.total);



                window.scrollTo(0, 0);

            } catch (err) {

                console.error("Errore durante il caricamento dei dati:", err);

            }

        };



        fetchAllData();

           

    }, [searchQuery]);



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

                {/* --- SEZIONE CONTENUTI --- */}

                {items.length > 0 && items.map((i) => (

                    <CardContents

                        key={`content-${i.id}`}

                        title={i.title}

                        slug={i.slug}

                        // Specifichiamo che è un contenuto

                        category="Luogo/Evento"

                        // Creiamo il link corretto

                        link={`/contents/${i.slug}`}

                        cover_image={`${API_URL}/images/${i.cover_image}`}

                    />

                ))}



                {/* --- SEZIONE ITINERARI (ora con CardContents!) --- */}

                {itineraries.length > 0 && itineraries.map((it) => (

                    <CardContents

                        key={`itinerary-${it.id}`}

                        title={it.title}

                        slug={it.slug}

                        // Specifichiamo che è un itinerario

                        category="Itinerario"

                        // Cambiamo la rotta del link

                        link={`/itineraries/${it.slug}`}

                        // Se l'itinerario non ha una cover specifica, puoi usarne una di default

                        cover_image={it.cover_image

                            ? `${API_URL}/images/${it.cover_image}`

                            : `${API_URL}/images/default-itinerary.jpg`

                        }

                    />

                ))}



                {items.length === 0 && itineraries.length === 0 && (

                    <div className="col-12 text-center py-5">

                        <p className="text-muted">Nessun risultato trovato per la tua ricerca.</p>

                    </div>

                )}

            </div>

        </div>

    );

}