import "./FollowUsBanner.css";

export default function FollowUsBanner() {
    // Array con i link reali ai tuoi post/reel
    const instagramPosts = [
    { id: 1, img: "/img/ig-1.jpg", url: "https://www.instagram.com/p/DV0TU2VDD6v/" },
    { id: 2, img: "/img/ig-2.jpg", url: "https://www.instagram.com/p/DT3MRocDTwr/" },
    { id: 3, img: "/img/ig-3.jpg", url: "https://www.instagram.com/p/DVS_6fYDd6u/" },
    { id: 4, img: "/img/ig-4.jpg", url: "https://www.instagram.com/p/DOOdmMyjP5l/" },
];

    return (
        <section className="follow-us-hero">
            <div className="container">
                <div className="row align-items-center">
                    
                    {/* COLONNA SINISTRA: Testo e Link Social */}
                    <div className="col-12 col-md-4 text-center text-md-start mb-5 mb-md-0">
                        <h2 className="follow-title">FOLLOW US</h2>
                        <p className="follow-subtitle">Resta aggiornato con i nostri contenuti social</p>
                        
                        <div className="social-links-wrapper">
                            <a href="https://www.instagram.com/visit_sancataldo/" target="_blank" rel="noreferrer" className="social-icon-link ig">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61579456103577&locale=it_IT" target="_blank" rel="noreferrer" className="social-icon-link fb">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://www.tiktok.com/@visit.sancataldo" target="_blank" rel="noreferrer" className="social-icon-link tt">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>
                        </div>
                    </div>

                    {/* COLONNA DESTRA: Griglia Anteprime */}
                    <div className="col-12 col-md-8">
                        <div className="insta-grid">
                            {instagramPosts.map((post) => (
                                <a 
                                    key={post.id} 
                                    href={post.url} 
                                    className="insta-item"
                                >
                                    {/* Recupero automatico della miniatura del video */}
                                    <img 
                                        src={post.img} 
                                        alt="Instagram video preview" 
                                        className="insta-img" 
                                    />
                                    
                                    {/* Overlay con Icona Play */}
                                    <div className="insta-overlay">
                                        <div className="play-button-circle">
                                            <i className="fa-solid fa-play"></i>
                                        </div>
                                        <i className="fa-brands fa-instagram instagram-corner-icon"></i>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}