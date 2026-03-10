import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Card from "./card"

export default function CategoryBanner() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/categories")
            .then((res) => {
                setCategories(res.data.results);
            })
            .catch((err) => console.error("Errore caricamento categorie", err))
    }, [])

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-4">

                {categories.map((c, index) => (
                    <Card 
                    key={index}
                    category={c.category}
                    category_cover={`http://localhost:3000/images/${c.category_cover}`}/>
                  
                ))}

            </div>
        </div>
    )
}