import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto w-100">
      <div className="container-fluid">
        <div className="row gy-3 align-items-center">
          
          {/* Columna 1: Marca Institucional */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5 className="fw-bold text-white mb-1">
              vcp<span className="text-primary">|</span>gob
            </h5>
            <p className="text-secondary small mb-0">
              Vidriera Virtual de Emprendedores
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="col-12 col-md-4 text-center">
            <ul className="list-inline mb-0 small">
              <li className="list-inline-item mx-2">
                <a href="/" className="text-secondary text-decoration-none hover-white">
                  Inicio
                </a>
              </li>
              <li className="list-inline-item mx-2 text-secondary">•</li>
              <li className="list-inline-item mx-2">
                <a href="/login" className="text-secondary text-decoration-none hover-white">
                  Ingresar
                </a>
              </li>
              <li className="list-inline-item mx-2 text-secondary">•</li>
              <li className="list-inline-item mx-2">
                <a href="/registro" className="text-secondary text-decoration-none hover-white">
                  Registrarse
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Copyright y Créditos */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <p className="text-secondary small mb-0">
              © {new Date().getFullYear()} Municipalidad de Villa Carlos Paz
            </p>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              Desarrollado para el desarrollo local
            </span>
          </div>

        </div>

        <hr className="my-3 border-secondary" />

        <div className="text-center text-muted small" style={{ fontSize: '0.7rem' }}>
          Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;