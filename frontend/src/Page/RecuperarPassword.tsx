import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RecuperarPassword: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

        try {
        // Simulación de llamada al backend (/api/auth/recover-password) [US-08]
        console.log('Solicitando recuperación para:', email);
        
        // Simulo respuesta exitosa para la demo de mañana
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');
        }, 1000);

        } catch (err) {
        setLoading(false);
        setError('Ocurrió un error al procesar la solicitud. Intenta nuevamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Recuperar Contraseña</h2>
            <p className="text-sm text-gray-600 mb-6">
            Ingresa tu correo electrónico registrado y te enviaremos las instrucciones.
            </p>

            {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
            </div>
            )}

            {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">
                {successMessage}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                Correo Electrónico
                </label>
                <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>
            </form>

            <button
            onClick={() => navigate('/login')}
            className="mt-6 text-sm text-blue-600 hover:underline inline-block"
            >
            ← Volver al inicio de sesión
            </button>
        </div>
        </div>
    );
    };