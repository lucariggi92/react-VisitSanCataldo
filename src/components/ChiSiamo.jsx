import "./ChiSiamo.css";

export default function ChiSiamo() {
    return (
        <div className="chisiamo-page">
            <div className="container content-wrapper">
                
                {/* Header Titolo */}
                <div className="chi-siamo-header">
                    <h1 className="chi-siamo-title">Chi siamo</h1>
                    <div className="chi-siamo-underline"></div>
                </div>

                {/* Descrizione Progetto */}
                <div className="row justify-content-center mt-5">
                    <div className="col-12">
                        <div className="chisiamo-description">
                            <p className="lead-text">
                                Il progetto nasce nel <strong>gennaio 2025</strong> con una missione chiara: 
                                raccontare l'anima di <strong>San Cataldo</strong>.
                            </p>
                            <p>
                                Non è solo una guida, ma un diario vivo che dà voce alle sue persone, 
                                ai suoi artigiani instancabili e alle specialità che rendono unico questo comune. 
                                Vogliamo custodire e tramandare la sua <strong>storia</strong>, valorizzando ogni vicolo e ogni tradizione.
                            </p>
                            <p>
                                Siamo un <strong>team di ragazzi giovanissimi</strong> che crede fermamente nel potenziale 
                                inespresso di questo territorio. Lavoriamo ogni giorno per la sua promozione e valorizzazione, 
                                convinti che l'energia delle nuove generazioni sia la chiave per far risplendere San Cataldo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Immagine Hero Finale (Footer Visual) */}
            <div className="herobanner footer-visual">
                <div className="text-heroBanner">
                    <h2>Il nostro territorio, <br/> la nostra storia.</h2>
                </div>
            </div>
            
            {/* Sezione Mobile (usando le tue classi) */}
            <div className="mobile-h-card">
                <div className="card-l-visit">
                    <img src="./hero.png" className="img-c-visit" alt="San Cataldo" />
                    <div className="title-c-visit">
                        <h2>San Cataldo <br/> 2025</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}