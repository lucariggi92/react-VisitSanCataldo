import "./HeroBanner.css"
import { Link } from "react-router-dom"
export default function HeroBanner() {
    return (
        <>

            <div className="herobanner pt-5">
                <div className="container-fluid text-heroBanner d-flex flex-column   justify-content-center align-items-center">
                    <h2>visit san cataldo</h2>
                    <Link to="/chi-siamo">
                        <button type="button" class="btn btn-outline-light" style={{ fontSize: "2vw", borderRadius: "40px" }}>Scopri di più</button>
                    </Link>
                </div>
            </div>

            {/* mobile card  */}

            <div className="mobile-h-card d-block d-sm-none">
                <div className="card-l-visit">
                    <img src="./hero.png" alt="Visit San Cataldo" className="img-c-visit" />
                    <div className="title-c-visit">
                        <h2>visit san cataldo</h2>
                        <Link to="/chi-siamo" className="mt-3">
                             <button className="btn btn-outline-light">Scopri di più</button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}