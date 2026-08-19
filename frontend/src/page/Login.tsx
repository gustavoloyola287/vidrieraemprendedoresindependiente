import React, { useState } from 'react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de inicio de sesión
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center min-vh-75">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow border-0 rounded-3 p-4 bg-white">
            <h2 className="text-center fw-bold text-primary mb-4">Iniciar sesión</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold text-secondary">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold text-secondary">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;