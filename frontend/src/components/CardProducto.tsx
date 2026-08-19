import React, { useState } from 'react';
import { type Producto } from '../Types/Producto';

interface CardProductoProps {
  producto: Producto;
}

export const CardProducto: React.FC<CardProductoProps> = ({ producto }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>
      {/* Targeta en la grilla (Click para abrir modal) */}
      <div 
        className="card h-100 shadow-sm border-0 cursor-pointer hover-shadow" 
        onClick={() => setMostrarModal(true)}
        style={{ cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
      >
        {/* Contenedor de la imagen */}
        <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={producto.urlImagen}
            alt={producto.nombre}
            className="card-img-top"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {producto.categoria && (
            <span 
              className="badge bg-primary position-absolute" 
              style={{ top: '6px', left: '6px', fontSize: '0.65rem' }}
            >
              {producto.categoria.nombre}
            </span>
          )}
        </div>

        {/* Cuerpo de la Tarjeta */}
        <div className="card-body p-2 d-flex flex-column justify-content-between">
          <div>
            <h6 className="card-title fw-bold text-truncate mb-1" style={{ fontSize: '0.85rem' }}>
              {producto.nombre}
            </h6>
            <p 
              className="card-text text-muted mb-2" 
              style={{ 
                fontSize: '0.75rem', 
                lineHeight: '1.2', 
                height: '2.4em', 
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {producto.descripcion}
            </p>
          </div>

          <div className="border-top pt-2 mt-1 d-flex justify-content-between align-items-center" style={{ fontSize: '0.7rem' }}>
            <span className="text-muted">Emprendimiento:</span>
            <span className="fw-bold text-dark text-truncate ms-1" style={{ maxWidth: '90px' }}>
              {producto.emprendedor?.nombreEmprendimiento}
            </span>
          </div>
        </div>
      </div>

      {/* Modal para ver el producto "agrandado" */}
      {mostrarModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex={-1} 
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMostrarModal(false)} // Cierra al hacer clic afuera
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg" 
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic DENTRO del modal
          >
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-primary">{producto.nombre}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              
              <div className="modal-body p-4">
                <div className="row g-4 align-items-center">
                  {/* Imagen Grande */}
                  <div className="col-12 col-md-6">
                    <img 
                      src={producto.urlImagen} 
                      alt={producto.nombre} 
                      className="img-fluid rounded-3 shadow-sm w-100"
                      style={{ maxHeight: '350px', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Detalles ampliados */}
                  <div className="col-12 col-md-6 text-start">
                    {producto.categoria && (
                      <span className="badge bg-primary mb-2">
                        {producto.categoria.nombre}
                      </span>
                    )}

                    <h3 className="fw-bold text-dark mb-3">{producto.nombre}</h3>
                    
                    <p className="text-muted mb-4" style={{ whiteSpace: 'pre-line' }}>
                      {producto.descripcion || "Sin descripción disponible."}
                    </p>
                      {/*Tarjeta de contacto del emprendedor*/}
                    <div className="p-3 bg-light rounded-3 border">
                      <strong className="mb-1 text-dark fs-7">Ofrecido por:</strong>
                      <h6 className="fw-bold text-primary mb-0">
                        {producto.emprendedor?.nombreEmprendimiento || "Emprendedor VCP"}
                      </h6>
                      <hr className="my-2" />
                      {/*Telefono del emprendedor*/}
                      <p className="mb-1 text-dark small d-flex align-items-center gap-2"></p>
                      <strong className="text-seconary">Teléfono:  
                        {producto.emprendedor?.telefono || "No disponible"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-secondary px-4 fw-semibold" 
                  onClick={() => setMostrarModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};