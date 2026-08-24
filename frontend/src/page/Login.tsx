import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Ajusta la ruta de importación según tu estructura

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = email.trim().toLowerCase();

    if (!emailTrimmed || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTrimmed, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales inválidas.');
      }

      // Guardar token y actualizar estado global de autenticación
      login(data.token);

      // Redirigir al inicio o panel
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center min-vh-75">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow border-0 rounded-3 p-4 bg-white">
            <h2 className="text-center fw-bold text-primary mb-4">Iniciar sesión</h2>

            {error && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3 text-start">
                <label htmlFor="loginEmail" className="form-label fw-semibold text-secondary">Email</label>
                <input
                  id="loginEmail"
                  type="email"
                  className="form-control"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-4 text-start">
                <label htmlFor="loginPassword" className="form-label fw-semibold text-secondary">Contraseña</label>
                <input
                  id="loginPassword"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
              <div className="mt-4 text-center">
  <Link 
    to="/recuperar-password" 
    className="text-blue-600 hover:underline text-sm font-medium"
  >
    ¿Olvidaste tu contraseña?
  </Link>
</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;