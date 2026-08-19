import { useEffect, useState } from "react";
import { type Producto } from "../Types/Producto";
import { getProductos } from "../services/productoService";
import { CardProducto } from "../components/CardProducto";

function Home() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const datos = await getProductos();
                setProductos(datos);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos de la vidriera");
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();
    }, []);

    // Filtrado local según lo que tipees en el buscador
    const productosFiltrados = productos.filter((prod) =>
        prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        prod.categoria?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        prod.emprendedor?.nombreEmprendimiento.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container py-4">
            <h1 className="h2 font-bold text-primary mb-3">Vidriera Virtual de Emprendedores VCP</h1>

            {/* Buscador adaptable con Bootstrap */}
            <div className="row mb-4">
                <div className="col-12 col-md-6 col-lg-5">
                    <input
                        type="text"
                        placeholder="Buscar producto, categoría o emprendimiento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="form-control shadow-sm"
                    />
                </div>
            </div>

            {error && <div className="alert alert-danger mb-4">{error}</div>}

            {cargando ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Cargando productos...</p>
                </div>
            ) : (
                /* Grilla Bootstrap: 2 columnas en móvil, 3 en tablet, 4 en PC */
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2 g-sm-3">
                    {productosFiltrados.map((producto) => (
                        <div key={producto.id} className="col">
                            <CardProducto producto={producto} />
                        </div>
                    ))}
                </div>
            )}

            {!cargando && productosFiltrados.length === 0 && (
                <p className="text-muted mt-4 text-center">
                    No se encontraron productos que coincidan con la búsqueda.
                </p>
            )}
        </div>
    );
}

export default Home;