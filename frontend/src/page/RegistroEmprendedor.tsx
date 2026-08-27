import React, { useState } from 'react';

interface RegistroProps {
  onRegistroExitoso?: () => void;
}

export const Registro: React.FC<RegistroProps> = ({ onRegistroExitoso }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    nombreEmprendimiento: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9()\s+-]{7,15}$/;

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es obligatorio.';
    }
    if (!formData.nombreEmprendimiento.trim()) {
      newErrors.nombreEmprendimiento = 'El nombre del emprendimiento es obligatorio.';
    }
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Ingrese un formato de correo electrónico válido.';
    }
    if (formData.telefono && !phoneRegex.test(formData.telefono.trim())) {
      newErrors.telefono = 'Formato de teléfono inválido (mínimo 7 números).';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setLoading(true);

    const payload = {
      nombreCompleto: formData.nombreCompleto.trim(),
      nombreEmprendimiento: formData.nombreEmprendimiento.trim(),
      email: formData.email.trim().toLowerCase(),
      telefono: formData.telefono.trim(),
      password: formData.password
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorMessage = `Error en el servidor (Código: ${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          if (response.status === 403) {
            errorMessage = 'Acceso denegado: El endpoint requiere permisos públicos en Spring Security.';
          }
        }
        throw new Error(errorMessage);
      }

      // Avanza al Paso 2 tras registrar las credenciales
      if (onRegistroExitoso) {
        onRegistroExitoso();
      }
    } catch (err: any) {
      setApiError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow border-0 rounded-3 p-4 bg-white">
            <h2 className="text-center fw-bold text-primary mb-2">Registrar emprendedor</h2>
            <p className="text-center text-muted small mb-4">Paso 1: Datos de la cuenta</p>

            {/* Alerta de recordatorio de contraseña */}
            <div className="alert alert-warning py-2 text-center small mb-3" role="alert">
              💡 <strong>Recordatorio:</strong> Por favor anotá tu clave en un lugar seguro.
            </div>

            {apiError && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3 text-start">
                <label htmlFor="nombreCompleto" className="form-label fw-semibold text-secondary">Nombre completo</label>
                <input
                  id="nombreCompleto"
                  type="text"
                  name="nombreCompleto"
                  className={`form-control ${errors.nombreCompleto ? 'is-invalid' : ''}`}
                  placeholder="Juan Pérez"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
                {errors.nombreCompleto && <div className="invalid-feedback">{errors.nombreCompleto}</div>}
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="nombreEmprendimiento" className="form-label fw-semibold text-secondary">Nombre del emprendimiento</label>
                <input
                  id="nombreEmprendimiento"
                  type="text"
                  name="nombreEmprendimiento"
                  className={`form-control ${errors.nombreEmprendimiento ? 'is-invalid' : ''}`}
                  placeholder="Mi Emprendimiento"
                  value={formData.nombreEmprendimiento}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                {errors.nombreEmprendimiento && <div className="invalid-feedback">{errors.nombreEmprendimiento}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3 text-start">
                  <label htmlFor="email" className="form-label fw-semibold text-secondary">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6 mb-3 text-start">
                  <label htmlFor="telefono" className="form-label fw-semibold text-secondary">Teléfono</label>
                  <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    placeholder="(123) 456-7890"
                    value={formData.telefono}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                  {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3 text-start">
                  <label htmlFor="password" className="form-label fw-semibold text-secondary">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="col-md-6 mb-4 text-start">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary">Confirmar contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                {loading ? 'Registrando...' : 'Siguiente (Paso 2)'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;