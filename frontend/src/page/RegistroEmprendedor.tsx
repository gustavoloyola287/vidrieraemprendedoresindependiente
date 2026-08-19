import React, { useState } from 'react';

export const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    nombreEmprendimiento: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de registro
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow border-0 rounded-3 p-4 bg-white">
            <h2 className="text-center fw-bold text-primary mb-4">Registrar emprendedor</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold text-secondary">Nombre completo</label>
                <input
                  type="text"
                  name="nombreCompleto"
                  className="form-control"
                  placeholder="Juan Pérez"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold text-secondary">Nombre del emprendimiento</label>
                <input
                  type="text"
                  name="nombreEmprendimiento"
                  className="form-control"
                    placeholder="Mi Emprendimiento"
                  value={formData.nombreEmprendimiento}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3 text-start">
                  <label className="form-label fw-semibold text-secondary">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-start">
                  <label className="form-label fw-semibold text-secondary">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    placeholder="(123) 456-7890"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3 text-start">
                  <label className="form-label fw-semibold text-secondary">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-4 text-start">
                  <label className="form-label fw-semibold text-secondary">Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Registro;