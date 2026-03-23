import { Link } from "react-router-dom"
import './CardContents.css'  

export default function CardContents({ title, cover_image, slug, category, link }) {

    // Funzione per mappare i colori alle categorie 🎨
    const getBadgeStyle = (cat) => {
        switch (cat?.toLowerCase()) {
            case "luogo da visitare": return { backgroundColor: "#dc3545" }; // Rosso 🔴
            case "cosa mangiare":      return { backgroundColor: "#ffc107", color: "#000" }; // Giallo 🟡
            case "tour":              return { backgroundColor: "#0d6efd" }; // Blu 🔵
            case "eventi":            return { backgroundColor: "#198754" }; // Verde 🟢
            case "storia e tradizioni": return { backgroundColor: "#6f42c1" }; // Viola 🟣
            default:                  return { backgroundColor: "#6c757d" }; // Grigio 🔘
        }
    };

    return (
        <div className="col-12 my-3 col-md-6 col-lg-4">
            <Link to={link || `/${slug}`} className="card-link-visit">
                
                {/* Badge della Categoria 🏷️ */}
                {category && (
                    <div className="badge-category" style={getBadgeStyle(category)}>
                        {category}
                    </div>
                )}

                <img src={cover_image} alt={title} className="img-card-visit" />
                
                <div className="title-card-visit">
                    <h2>{title}</h2>
                </div>
            </Link>
        </div>
    );
}