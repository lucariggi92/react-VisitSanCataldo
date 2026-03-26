import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Card from "./Card"
import "./CategoryBanner.css"


const API_URL = import.meta.env.VITE_BACKEND_URL;


export default function CategoryBanner() {
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/categories`)
            .then((res) => {
                setCategories(res.data.results);
            })
            .catch((err) => console.error("Errore caricamento categorie", err))
    }, [])

    // Aggiorna il pallino attivo mentre scrolli
    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;
        const cardWidth = container.firstChild.offsetWidth + 16; // width + margin
        const index = Math.round(container.scrollLeft / cardWidth);
        setActiveIndex(index);
    };

    return (
        <div className="mobile-category-hero-bg mt-5">
       
        <div className="container">
                <h2 className="h2-hero">Cosa cerchi?</h2>
                 {/* Pallini di scroll */}
                <div className="category-dots">
                    {categories.map((_, i) => (
                        <span 
                            key={i} 
                            className={i === activeIndex ? "dot active" : "dot"}
                        ></span>
                    ))}
                </div>
            <div className="row row-hero"  ref={scrollRef} 
                    onScroll={handleScroll}>
            

                {categories.map((c, index) => (
                    <Card 
                    key={index}
                    category={c.category}
                    category_cover={`${API_URL}/images/${c.category_cover}`}/>
                  
                ))}

            </div>
        </div>
         </div>
    )
}

