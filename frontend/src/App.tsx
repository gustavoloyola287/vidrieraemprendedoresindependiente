import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./page/Home";
import Login from "./page/Login";
import RegistroEmprendedor from "./page/RegistroEmprendedor";
import DetalleEmprendedor from "./page/DetalleEmprendedor";

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
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
    );
}

export default App;