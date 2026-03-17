export default function CardDetail({ item }) {
    const imgBaseUrl = "http://localhost:3000/images/";

    return (
        <div className="card-detail-wrapper animate__animated animate__fadeIn">
            <div className="row">
                {/* Sezione Immagini */}
                <div className="col-lg-8">
                    <div className="main-image-viewport mb-3">
                        <img 
                            src={`${imgBaseUrl}${item.tutte_le_foto?.[0]}`} 
                            alt={item.title} 
                            className="img-fluid rounded-4 shadow-lg w-100"
                            style={{ maxHeight: '600px', objectFit: 'cover' }}
                        />
                    </div>
                    {/* Gallery Thumbnails */}
                    <div className="d-flex gap-2 flex-wrap">
                        {item.tutte_le_foto?.map((foto, index) => (
                            <img 
                                key={index}
                                src={`${imgBaseUrl}${foto}`} 
                                className="img-thumbnail rounded-3" 
                                style={{ width: '120px', height: '90px', objectFit: 'cover', cursor: 'pointer' }}
                                alt={`Galleria ${index}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Sezione Testi */}
                <div className="col-lg-4">
                    <div className="p-4 bg-white rounded-4 shadow-sm border">
                        <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase">
                            {item.category}
                        </span>
                        <h1 className="fw-bold mb-4">{item.title}</h1>
                        <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                            {item.description}
                        </p>
                        
                        {item.tag && (
                            <div className="tags-container pt-3 border-top">
                                <span className="d-block small text-muted mb-2">TAG CORRELATI</span>
                                <div className="d-flex flex-wrap gap-2">
                                    {item.tag.split(',').map((t, i) => (
                                        <span key={i} className="badge border text-dark fw-normal">#{t.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}