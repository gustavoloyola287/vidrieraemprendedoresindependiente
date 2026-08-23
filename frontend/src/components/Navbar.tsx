import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Ajustá la ruta según la ubicación exacta de tu AuthContext

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, isAuthenticated, logout } = useAuth();

  // Función helper básica para extraer el payload del JWT sin librerías externas
  const getUserFromToken = () => {
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = atob(payloadBase64);
      return JSON.parse(decodedJson);
    } catch {
      return null;
    }
  };

  const user = getUserFromToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper para saber si una ruta está activa
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" 
      data-bs-theme="dark"
      style={{ backgroundColor: '#181E2E' }}
    >
      <div className="container">
        
        {/* Logo estilo VCP | gob */}
        <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center text-white text-decoration-none">
          vcp<span style={{ color: '#00A3B5', fontWeight: '300' }}>|</span>gob
          <span className="fs-6 text-white-50 ms-2 d-none d-sm-inline fw-normal">
            {/* Vidriera Virtual de Emprendedores */}
          </span>
        </Link>

        {/* Botón Hamburguesa */}
        <button
          className="navbar-toggler border-0 focus-ring-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarVCP"
          aria-controls="navbarVCP"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del Menú */}
        <div className="collapse navbar-collapse" id="navbarVCP">
          
          {/* Navegación Principal */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link px-3 transition-all ${isActive('/') ? 'active-side-orange' : 'custom-side-btn'}`}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/emprendedores" 
                className={`nav-link px-3 transition-all ${isActive('/emprendedores') ? 'active-side-orange' : 'custom-side-btn'}`}
              >
                Emprendedores
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/categorias" 
                className={`nav-link px-3 transition-all ${isActive('/categorias') ? 'active-side-orange' : 'custom-side-btn'}`}
              >
                Categorías
              </Link>
            </li>
          </ul>

          {/* Estado de Autenticación mediante Contexto */}
          <div className="d-flex align-items-lg-center flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
            {isAuthenticated ? (
              <>
                <span className="badge rounded-pill text-white bg-secondary bg-opacity-20 px-3 py-2 border border-secondary align-self-start align-self-lg-center">
                  {user?.nombre || user?.email || 'Usuario'}
                </span>

                {user?.rol === 'ADMIN' && (
                  <Link to="/admin" className="btn btn-outline-light btn-sm w-100 w-lg-auto">
                    Panel Admin
                  </Link>
                )}

                <Link to="/mis-productos" className="btn btn-outline-light btn-sm w-100 w-lg-auto">
                  Mis Productos
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm w-100 w-lg-auto"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm text-white px-3 w-100 w-lg-auto"
                  style={{ backgroundColor: '#252D42', border: '1px solid #3B4764' }}
                >
                  Ingresar
                </Link>
                <Link
                  to="/registro"
                  className="btn btn-sm text-white px-3 w-100 w-lg-auto"
                  style={{ backgroundColor: '#00A3B5' }}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Estilos sutiles con acento de línea lateral izquierda única */}
      <style>{`
        .custom-side-btn {
          color: rgba(255, 255, 255, 0.75) !important;
          border-left: 2px solid transparent;
          border-radius: 2px;
          transition: all 0.2s ease-in-out;
        }
        .custom-side-btn:hover {
          color: #fff !important;
          border-left-color: rgba(255, 123, 0, 0.6);
        }
        .active-side-orange {
          color: #fff !important;
          font-weight: 600;
          border-left: 2px solid #FF7B00 !important;
          border-radius: 2px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;