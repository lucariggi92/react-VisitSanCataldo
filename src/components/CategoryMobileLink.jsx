import { useState, useEffect } from "react";

import axios from "axios";

import CardMini from "./CardMini"; 



export default function CategoryMobileLink() {

    const [categories, setCategories] = useState([]);



    useEffect(() => {

        axios.get("http://localhost:3000/api/categories")

            .then((res) => setCategories(res.data.results))

            .catch((err) => console.error("Errore caricamento categorie", err));

    }, []);



    return (

        <div className="category-scroll-wrapper">

            {categories.map((c, index) => (

                <CardMini

                    key={index}

                    category={c.category}

                    category_cover={`http://localhost:3000/images/${c.category_cover}`}

                />

            ))}

        </div>

    );

} 