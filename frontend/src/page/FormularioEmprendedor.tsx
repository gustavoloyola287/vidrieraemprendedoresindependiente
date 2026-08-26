import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormularioEmprendedorProps {
    onSubmitSuccess?: () => void;
    }

    interface FormDataState {
    descripcion: string;
    imagen: File | null;
    }

    export const FormularioEmprendedor: React.FC<FormularioEmprendedorProps> = ({ onSubmitSuccess }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormDataState>({
        descripcion: '',
        imagen: null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
        setFormData((prev) => ({ ...prev, imagen: file }));
        setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.descripcion.trim()) {
        setError('La descripción del emprendimiento es obligatoria.');
        setLoading(false);
        return;
        }

        try {
        const dataToSend = new FormData();
        dataToSend.append('descripcion', formData.descripcion);
        if (formData.imagen) {
            dataToSend.append('imagen', formData.imagen);
        }

        // TODO: Conectar con tu endpoint del backend
        // await registrarDetallesEmprendedor(dataToSend);

        if (onSubmitSuccess) {
            onSubmitSuccess();
        } else {
            navigate('/login');
        }
        } catch (err: any) {
        setError(err.response?.data?.message || 'Error al guardar los datos del emprendimiento.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container py-5">
        <div className="row justify-content-center align-items-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card shadow border-0 rounded-3 p-4 bg-white">
                <h2 className="text-center fw-bold text-primary mb-1">Datos de tu Emprendimiento</h2>
                <p className="text-center text-muted small mb-4">Completá la información para mostrar tu marca en la vidriera.</p>

                {error && (
                <div className="alert alert-danger py-2 text-center mb-3" role="alert">
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit}>
                {/* Campo Descripción */}
                <div className="mb-3 text-start">
                    <label htmlFor="descripcion" className="form-label fw-semibold text-secondary">
                    Descripción del Emprendimiento *
                    </label>
                    <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    className="form-control"
                    placeholder="Contanos qué hacés, tus productos estrella, tu historia..."
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    />
                </div>

                {/* Campo Carga de Imagen */}
                <div className="mb-4 text-start">
                    <label htmlFor="imagen" className="form-label fw-semibold text-secondary">
                    Imagen / Logo del Emprendimiento
                    </label>
                    <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                    {preview && (
                    <div className="text-center mt-3">
                        <img
                        src={preview}
                        alt="Vista previa"
                        className="img-fluid rounded border"
                        style={{ maxHeight: '160px', objectFit: 'cover' }}
                        />
                    </div>
                    )}
                </div>

                {/* Botón Finalizar */}
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                    {loading ? 'Guardando...' : 'Finalizar Registro'}
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};