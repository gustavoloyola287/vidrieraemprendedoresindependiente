import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./page/Home";
import Login from "./page/Login";
import RegistroEmprendedor from "./page/RegistroEmprendedor";
import DetalleEmprendedor from "./page/DetalleEmprendedor";
import ProtectedRoute from "./components/ProtectedRoute"; // Import de la ruta protegida
import { CategoriasPage } from "./page/CategoriasPage";
import { EmprendedoresPage } from "./page/EmprendedoresPage";

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            {/* Contenedor Flexbox que empuja el footer hacia abajo */}
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                
                <main className="flex-grow-1">
                    <Routes>
                        {/* Rutas Públicas */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro" element={<RegistroEmprendedor />} />
                        <Route path="/emprendedor/:id" element={<DetalleEmprendedor />} />
                        <Route path="/categorias" element={<CategoriasPage />} />
                        <Route path="/emprendedores" element={<EmprendedoresPage />} />

                        {/* Ruta Protegida: requiere sesión activa */}
                        <Route 
                            path="/mis-productos" 
                            element={
                                <ProtectedRoute>
                                    {/* Reemplazá este placeholder por tu componente de MisProductos */}
                                    <div>Página de Mis Productos</div> 
                                </ProtectedRoute>
                            } 
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