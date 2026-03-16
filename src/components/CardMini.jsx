import { Link } from "react-router-dom";
import './Card.css';  

export default function CardMini({ category, category_cover }) {
    return (
        <Link to={`/category/${category}`} className="card-mini-visit">
            <div className="img-container-mini">
                <img src={category_cover} alt={category} className="img-mini" />
            </div>
            <span className="title-mini">{category.replaceAll('-', ' ')}</span>
        </Link>
    );
}