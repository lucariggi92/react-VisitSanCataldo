import {useState, useEffect} from "react";
import axios from "axios";
import CardContents from "./CardContents";

const API_URL = import.meta.env.VITE_BACKEND_URL;


export default function ContentGrid({category}){
    const[items, setItems]=useState([])

    useEffect(()=>{
        axios.get(`${API_URL}/api/contents?category=${category}`)
        .then((res)=>{setItems(res.data.results)})
        .catch((err)=> console.error(`Errore caricamento ${category}`, err))
    },[category])
    return(

        <div className="container margin-grid-visit" style={{marginTop:"180px"}}>
    <div className="category-header">
        <h1 className="category-title">
            {category.replaceAll('-', ' ')}
        </h1>
        <div className="category-underline"></div>
    </div>
                    <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mb-4">
        
                        {items.map((i) => (
                            <CardContents 
                            key={i.id}
                                               
                        title={i.title}
                            slug={i.slug}
                            category={category}
                            cover_image={`${API_URL}/images/${i.cover_image}`}
                            />
                          
                        ))}
        
                    </div>
                </div>
    )
}