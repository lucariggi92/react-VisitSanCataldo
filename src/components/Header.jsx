import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const navLinks = [
    { name: "storia e tradizioni", path: "/category/storia-e-tradizioni" },
    { name: "luoghi da visitare", path: "/category/luoghi-da-visitare" },
    { name: "itinerari", path: "/itinerari" },
    { name: "eventi", path: "/category/eventi" },
    { name: "cosa mangiare", path: "/category/cosa-mangiare" },
    { name: "chi siamo", path: "/chi-siamo" }
];

export default function Header() {
    const navigate = useNavigate();
    const [localSearch, setLocalSearch] = useState("");

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (localSearch.trim() !== "") {
            navigate(`/risultati?search=${encodeURIComponent(localSearch.trim())}`);
            setLocalSearch("");
        }
    };

    return (
        <div className="fixed-top-container">
            <header className="header-visit">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid px-lg-5 d-flex align-items-center">
                        
                        {/* 1. HAMBURGER (Sinistra su Tablet/Mobile) */}
                        <button className="navbar-toggler order-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* 2. LOGO (Centro su Tablet, Sinistra su Desktop) */}
                        <Link to="/" className="navbar-brand m-0 order-1 order-lg-0 mx-auto mx-lg-0">
                            <img src="./logo.png" alt="Logo" className="logo-visit" />
                        </Link>

                        {/* 3. MENU DESKTOP */}
                        <div className="collapse navbar-collapse order-lg-1 justify-content-center" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link className="nav-link" to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. SEARCHBAR DESKTOP/TABLET (Scompare su Mobile < 576px) */}
                        <div className="search-wrapper order-2 d-none d-sm-flex">
                            <form className="search-group" onSubmit={handleSearch}>
                                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                                <input
                                    className="form-control search-input"
                                    type="search"
                                    placeholder="Cerca..."
                                    value={localSearch}
                                    onChange={(e) => setLocalSearch(e.target.value)}
                                />
                                <button type="submit" className="btn-search-submit">CERCA</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>

            {/* 5. SEARCHBAR MOBILE (Sotto l'header, visibile solo < 576px) */}
            <div className="mobile-search-bar d-block d-sm-none">
                <form className="search-group container" onSubmit={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input
                        className="form-control search-input w-100"
                        type="search"
                        placeholder="Cerca..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <button type="submit" className="btn-search-submit">CERCA</button>
                </form>
            </div>
        </div>
    );
}