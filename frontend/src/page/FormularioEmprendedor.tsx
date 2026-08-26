import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Interfaz para las Props del componente
interface FormularioEmprendedorProps {
    onSubmitSuccess?: () => void;
    }

    // 2. Interfaz para la estructura del estado del formulario
    interface FormDataState {
    descripcion: string;
    imagen: File | null;
    }

    export const FormularioEmprendedor: React.FC<FormularioEmprendedorProps> = ({ onSubmitSuccess }) => {
    const navigate = useNavigate();

    // Estados tipados explícitamente para evitar tipos 'any' o 'never'
    const [formData, setFormData] = useState<FormDataState>({
        descripcion: '',
        imagen: null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Manejar cambios en la descripción
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar la carga de imagen y vista previa
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

        // Validaciones básicas en cliente
        if (!formData.descripcion.trim()) {
        setError('La descripción del emprendimiento es obligatoria.');
        setLoading(false);
        return;
        }

        try {
        // Preparar FormData para envío con archivo (multipart/form-data)
        const dataToSend = new FormData();
        dataToSend.append('descripcion', formData.descripcion);
        if (formData.imagen) {
            dataToSend.append('imagen', formData.imagen);
        }

        // TODO: Conectar con tu endpoint/servicio del backend
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
        <div className="emprendedor-form-container">
        <h2>Paso 2: Datos de tu Emprendimiento</h2>
        <p>Completá la información para mostrar tu marca en la vidriera.</p>

        <form onSubmit={handleSubmit} className="emprendedor-form">
            {/* Campo Descripción */}
            <div className="form-group">
            <label htmlFor="descripcion">Descripción del Emprendimiento *</label>
            <textarea
                id="descripcion"
                name="descripcion"
                rows={4}
                placeholder="Contanos qué hacés, tus productos estrella, tu historia..."
                value={formData.descripcion}
                onChange={handleChange}
                required
            />
            </div>

            {/* Campo Carga de Imagen */}
            <div className="form-group">
            <label htmlFor="imagen">Imagen / Logo del Emprendimiento</label>
            <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleImageChange}
            />
            {preview && (
                <div className="image-preview">
                <img src={preview} alt="Vista previa" />
                </div>
            )}
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Finalizar Registro'}
            </button>
        </form>
        </div>
    );
};