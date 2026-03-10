import { Link } from "react-router-dom"
import './Card.css'  

export default function Card({ category, category_cover }) {
    return (
        <div className="col-12 my-3 col-md-6 col-lg-4">
            <Link to={`/category/${category}`} className="card-link-visit">
                <img src={category_cover} alt={category} className="img-card-visit" />
                <div className="title-card-visit">
                    <h1>{category}</h1>
                </div>
            </Link>
        </div>
    )
}