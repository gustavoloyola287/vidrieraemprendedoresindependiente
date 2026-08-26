import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type RegistroProps = {
    onRegistroExitoso: () => void;
};

const Registro: React.FC<RegistroProps> = ({ onRegistroExitoso }) => (
    <form onSubmit={(event) => {
        event.preventDefault();
        onRegistroExitoso();
    }}>
        <button type="submit">Registrarse</button>
    </form>
);

type FormularioEmprendedorProps = {
    onSubmitSuccess: () => void;
};

const FormularioEmprendedor: React.FC<FormularioEmprendedorProps> = ({ onSubmitSuccess }) => (
    <form onSubmit={(event) => {
        event.preventDefault();
        onSubmitSuccess();
    }}>
        <button type="submit">Continuar</button>
    </form>
);

export const RegistroWizard: React.FC = () => {
    const [paso, setPaso] = useState<number>(1);
    const navigate = useNavigate();

    return (
        <div>
        {paso === 1 && (
            <Registro onRegistroExitoso={() => setPaso(2)} />
        )}
        {paso === 2 && (
            <FormularioEmprendedor onSubmitSuccess={() => navigate('/login')} />
        )}
        </div>
    );
};