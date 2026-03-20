import "./HeroBanner.css"
import { Link } from "react-router-dom"
export default function HeroBanner() {
    return (
        <>

            <div className="herobanner pt-5">
                
                <div className="container-fluid text-heroBanner d-flex flex-column   justify-content-center align-items-center">
                    <h2>visit san cataldo</h2>
                   <Link to="/chi-siamo" style={{marginBottom:"30px"}}>

    <button type="button" className="btn-hero">
        Scopri di più
    </button>
</Link>
                </div>
            </div>

       

          {/* mobile card  */}
<div className="mobile-h-card  ">
    <div className="card-l-visit">
        <img src="./hero.png" alt="Visit San Cataldo" className="img-c-visit" />
        <div className="title-c-visit">
            <h2>visit san cataldo</h2>
            <Link to="/chi-siamo" className="mt-3">
                {/* Cambiata la classe qui sotto */}
                <button className="btn-hero">Scopri di più</button>
            </Link>
        </div>
    </div>
</div>

        </>
    )
}