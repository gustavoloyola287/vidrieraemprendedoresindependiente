import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from "./Page/Home";
import Login from "./Page/Login";
import RegistroEmprendedor from "./Page/RegistroEmprendedor";
import DetalleEmprendedor from "./Page/DetalleEmprendedor";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import de la ruta protegida
import { CategoriasPage } from "./Page/CategoriasPage";
import { EmprendedoresPage } from "./Page/EmprendedoresPage";
import { RecuperarPassword } from "./Page/RecuperarPassword";
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
                        <Route path="/recuperar-password" element={<RecuperarPassword />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;