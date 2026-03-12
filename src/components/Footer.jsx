import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer-visit">
            <div className="container">
                <div className="row py-5">
                    {/* SEZIONE LOGO E INFO */}
                    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 text-center text-lg-start">
                        <img src="./logo.png" alt="Logo San Cataldo" className="logo-footer mb-3" />
                        <p className="text-muted small">
                            Scopri la bellezza, la storia e le tradizioni di San Cataldo. 
                            Un viaggio tra cultura, sapori autentici e paesaggi indimenticabili.
                        </p>
                        <div className="social-links">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>

                    {/* LINK RAPIDI (Dall'Header) */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
                        <h5 className="footer-title">Esplora</h5>
                        <ul className="list-unstyled footer-nav-links">
                            <li><Link to="/category/storia-e-tradizioni">Storia e Tradizioni</Link></li>
                            <li><Link to="/category/luoghi-da-visitare">Luoghi da Visitare</Link></li>
                            <li><Link to="/itinerari">Itinerari</Link></li>
                            <li><Link to="/category/eventi">Eventi</Link></li>
                            <li><Link to="/chi-siamo">Chi Siamo</Link></li>
                        </ul>
                    </div>

                    {/* CONTATTI E NEWSLETTER */}
                    <div className="col-lg-4 col-md-6 text-center text-lg-start">
                        <h5 className="footer-title">Contatti</h5>
                        <ul className="list-unstyled footer-info">
                            <li><i className="fa-solid fa-location-dot me-2"></i> Comune di San Cataldo, CL</li>
                            <li><i className="fa-solid fa-envelope me-2"></i> info@visitsancataldo.it</li>
                        </ul>
                        <div className="mt-4">
                            <h6 className="footer-title-sm">Iscriviti alla Newsletter</h6>
                            <div className="input-group mb-3 newsletter-group">
                                <input type="text" className="form-control" placeholder="La tua email" />
                                <button className="btn btn-outline-light" type="button">Invia</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="row pb-4">
                    <div className="col-md-12 text-center">
                        <p className="copyright-text">
                            © {new Date().getFullYear()} Visit San Cataldo - Tutti i diritti riservati.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}