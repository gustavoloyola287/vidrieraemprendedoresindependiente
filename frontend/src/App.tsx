import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./page/Home";
import Login from "./page/Login";
import RegistroEmprendedor from "./page/RegistroEmprendedor";
import DetalleEmprendedor from "./page/DetalleEmprendedor";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AuthProvider  from './Context/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Page/Home';
import Login from './Page/Login';
import RegistroEmprendedor from './Page/RegistroEmprendedor';
import DetalleEmprendedor from './Page/DetalleEmprendedor';

function App() {
    return (
    <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/registro"
                    element={<RegistroEmprendedor />}
                />

                <Route
                    path="/emprendedor/:id"
                    element={<DetalleEmprendedor />}
                />
            </Routes>
            </main>
            <Footer />
               
        </div>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;