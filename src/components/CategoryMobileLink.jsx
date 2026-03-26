import { useState, useEffect } from "react";

import axios from "axios";

import CardMini from "./CardMini"; 

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CategoryMobileLink() {

    const [categories, setCategories] = useState([]);



    useEffect(() => {

        axios.get(`${API_URL}/api/categories`)

            .then((res) => setCategories(res.data.results))

            .catch((err) => console.error("Errore caricamento categorie", err));

    }, []);



    return (

        <div className="category-scroll-wrapper">

            {categories.map((c, index) => (

                <CardMini

                    key={index}

                    category={c.category}

                    category_cover={`${API_URL}/images/${c.category_cover}`}

                />

            ))}

        </div>

    );

} 