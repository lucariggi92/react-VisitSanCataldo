import {useState, useEffect} from "react";
import axios from "axios";
import CardContents from "./CardContents";

export default function ContentGrid({category}){
    const[items, setItems]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/contents?category=${category}`)
        .then((res)=>{setItems(res.data.results)})
        .catch((err)=> console.error(`Errore caricamento ${category}`, err))
    },[category])
    return(

        <div className="container" style={{marginTop:"150px"}}>
            <h1 className="my-4 text-capitalize text-center">{category.replaceAll('-', ' ')}</h1>
                    <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mb-4">
        
                        {items.map((i) => (
                            <CardContents 
                            key={i.id}
                                               
                        title={i.title}
                            slug={i.slug}
                            cover_image={`http://localhost:3000/images/${i.cover_image}`}
                            />
                          
                        ))}
        
                    </div>
                </div>
    )
}