import "./Header.css"
import { Link } from "react-router-dom"
import { useState } from "react";

const navLinks = [
    { name: "storia e tradizioni", path: "/category/storia" },
    { name: "luoghi da vedere", path: "/category/luoghi" },
    { name: "itinerari", path: "/itinerari" },
    { name: "eventi", path: "/category/eventi" },
    { name: "cosa mangiare", path: "/category/food" },
    { name: "chi siamo", path: "/chi-siamo" }

]
export default function Header() {
    return (
      
        <header className="header-visit">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container d-flex align-items-center justify-content-between">
                    
                    {/* HAMBURGER MENU */}
                    <button className="navbar-toggler order-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/*LOGO*/}
                    <Link to="/" className="navbar m-0 order-1 order-lg-0 logo-container">
                        <img src="./logo.png" alt="Logo" className="logo-visit" />
                    </Link>

                    {/* MENU */}
                    <div className="collapse navbar-collapse order-lg-1 justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {navLinks.map((link, index) => (
                                <li className="nav-item text-center" key={index}>
                                    <Link className="nav-link active" to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SEARCHBAR*/}
                    <div className="search-wrapper order-2 order-lg-2">

                        {/* Icona Lente (Solo Mobile) */}
                       <div className="d-sm-none text-white search-icon-mobile">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>

                        {/* Searchbar Completa (Solo Desktop) */}
                        <form className="d-none d-sm-flex search-visit" role="search">
                            <div className="search-group">
                                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                                <input className="form-control form-control-sm" type="search" placeholder="Cerca..." />
                            </div>
                        </form>
                    </div>
                    
                </div>
            </nav>
        </header>
    );
}