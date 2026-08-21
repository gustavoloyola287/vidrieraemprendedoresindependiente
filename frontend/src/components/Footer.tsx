import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#181E2E', fontFamily: 'Jost, Poppins, sans-serif' }} className="text-white pt-5 pb-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          
          {/* Marca / Municipio */}
          <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#00A3B5' }}>
              Vidriera de Emprendedores
            </h6>
            <p className="small text-white-50">
              Impulsando el trabajo local, la innovación y el talento en Villa Carlos Paz.
            </p>
            <div style={{ height: '3px', width: '50px', backgroundColor: '#F2C94C' }} className="mb-2"></div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#00A3B5' }}>Navegación</h6>
            <p className="mb-2"><a href="/" className="text-white-50 text-decoration-none">Inicio</a></p>
            <p className="mb-2"><a href="/emprendedores" className="text-white-50 text-decoration-none">Emprendedores</a></p>
            <p className="mb-2"><a href="/categorias" className="text-white-50 text-decoration-none">Categorías</a></p>
          </div>

          {/* Contacto */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#00A3B5' }}>Contacto</h6>
            <p className="text-white-50 small mb-2">📍 Municipalidad de Villa Carlos Paz</p>
            <p className="text-white-50 small mb-2">✉️ empleo@villacarlospaz.gov.ar</p>
          </div>

        </div>
      </div>

      {/* Copyright Line */}
      <div className="text-center p-3 border-top border-secondary border-opacity-25 mt-3 text-white-50 small">
        © 2026 Municipalidad de Villa Carlos Paz — Secretaría de Empleo y Emprendedurismo
      </div>
    </footer>
  );
};

export default Footer;