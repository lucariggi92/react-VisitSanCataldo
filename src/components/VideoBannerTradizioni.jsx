
import { useRef } from "react";
import "./VideoBanner.css";

export default function VideoBannerTradizioni() {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false; // Attiva l'audio
            videoRef.current.play();        // Assicura che sia in play
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;  // Torna muto
            // Opzionale: videoRef.current.pause(); // Se vuoi che si fermi anche
        }
    };

    return (
        <div 
            className="video-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video 
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                playsInline 
                src="./hero-video-1.mp4"
                className="video-bg"
            ></video>
            
            <div className="video-content">
                <h2>TRADIZIONE</h2>
                          </div>
        </div>
    );
}