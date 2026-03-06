import "./Header.css"
import { Link } from "react-router-dom"

const navLinks = [
    { name: "storia e tradizioni", path:"/storia&tradizioni" },
    { name: "luoghi da vedere", path:"/luoghi-da-vedere"},
    { name: "itinerari", path:"/itinerari"},
    { name: "eventi", path:"/eventi"},
    { name: "cosa mangiare", path:"/cosa-mangiare"},
    { name: "chi siamo", path:"/chi-siamo" }

]
export default function Header() {
    return (
        <>
            <div className="header">
              


                <nav className="navbar  navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><img src="./logo.png" alt="" style={{width:"400px"}}/></Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                                {navLinks.map((link, index) =>
                                (
                                    <li className="nav-item" key={index}>
                                        <Link className="nav-link active" aria-current="page" to={link.path}>{link.name}</Link>
                                    </li>
                                ))}

                                

                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                </div>
            
        </>
    )

}