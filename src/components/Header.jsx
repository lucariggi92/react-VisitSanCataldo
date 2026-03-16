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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (localSearch.trim() !== "") {
            navigate(`/risultati?search=${encodeURIComponent(localSearch.trim())}`);
            setLocalSearch("");
        }
    };

// MI RIPORTA IN CIMA
    const handleStartClick = () => {
    window.scrollTo(0, 0); 
    closeMenu(); 
};

    return (
        <div className="fixed-top-container">
            
            {/* -----------------DESKTOP E TABLET --------------- */}
            <header className="header-visit d-none d-sm-block">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid px-lg-5">
                        
                        {/* Hamburger (Solo Tablet - visibile tra 576px e 991px) */}
                        <button className="navbar-toggler d-lg-none" type="button" onClick={toggleMenu}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Logo */}
                        <Link to="/" className="navbar-brand" onClick={handleStartClick}>
                            <img src="./logo.png" alt="Logo" className="logo-visit" />
                        </Link>

                        {/* Menu Links (Solo Desktop - visibile da 992px) */}
                        <div className="collapse navbar-collapse justify-content-center">
                            <ul className="navbar-nav">
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link className="nav-link" to={link.path} onClick={handleStartClick}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Search (Desktop e Tablet) */}
                        <div className="search-wrapper d-none d-sm-flex">
                            <form className="search-group" onSubmit={handleSearch}>
                                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                                <input 
                                    className="search-input" 
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

            {/* -------------MOBILE (< 576px)---------- */}
            <header className="header-mobile d-block d-sm-none">
                <div className="mobile-logo-area text-center py-2">
                    <Link to="/" onClick={handleStartClick}>
                        <img src="./logo.png" alt="Logo" className="logo-visit" />
                    </Link>
                </div>
                
                {/* Searchbar Mobile */}
                <div className="mobile-search-area px-3 pb-2">
                    <form className="search-group" onSubmit={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input 
                            className="search-input w-100" 
                            type="search" 
                            placeholder="Cerca..." 
                            value={localSearch} 
                            onChange={(e) => setLocalSearch(e.target.value)} 
                        />
                        <button type="submit" className="btn-search-submit">CERCA</button>
                    </form>
                </div>
                
            </header>

            {/* MENU OFFCANVAS------------ (Solo per Tablet)*/}
            <div className={`custom-menu-offcanvas ${isMenuOpen ? "open" : ""}`}>
                <div className="offcanvas-header-visit">
                    <button className="btn-close btn-close-white" onClick={closeMenu}></button>
                </div>
                <div className="offcanvas-body-visit">
                    <ul className="navbar-nav gap-3 mt-3">
                        {navLinks.map((link, index) => (
                            <li className="nav-item-tablet" key={index}>
                                <Link className="nav-link ms-3" to={link.path}  onClick={closeMenu}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}