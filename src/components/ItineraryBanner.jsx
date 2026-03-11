import "./ItineraryBanner.css"
import { Link } from "react-router-dom"
export default function ItineraryBanner(){
    return(
        <>
            <div className="itinerary-banner pt-5">
                <div className="container-fluid text-heroBanner d-flex flex-column   justify-content-center align-items-center">
               <h2>Scopri gli Itinerari</h2>
             <Link to="/chi-siamo">
             <button type="button" class="btn btn-outline-light" style={{fontSize:"2vw", borderRadius:"40px"}}>Scopri di più</button>
               </Link>
               </div>
            </div>

        </>
    )
}