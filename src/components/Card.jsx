import { Link } from "react-router-dom"
import './Card.css'  

export default function Card({ category, category_cover }) {
    // MI RIPORTA IN CIMA
    const handleStartClick = () => {
    window.scrollTo(0, 0); 
    // closeMenu(); // Commentato perché non definito - aggiungi se necessario
};
    return (
        <div className="col-6  col-6-mobile my-3 col-md-6 col-lg-3">
            <Link to={`/category/${category}`} className="card-link-visit" onClick={handleStartClick}>
                <img src={category_cover} alt={category} className="img-card-visit" />
                <div className="title-card-visit">
                    <h2>{category.replaceAll('-', ' ')}</h2>
                </div>
            </Link>
        </div>
    )
}