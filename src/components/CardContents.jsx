import { Link } from "react-router-dom"
import './Card.css'  


export default function CardContents({title, cover_image}){

    return(

    <div className="col-12 my-3 col-md-6 col-lg-4">
            <Link to={`/`} className="card-link-visit">
                <img src={cover_image} alt={title} className="img-card-visit" />
                <div className="title-card-visit">
                    <h2>{title}</h2>
                </div>
            </Link>
        </div>
    )
}