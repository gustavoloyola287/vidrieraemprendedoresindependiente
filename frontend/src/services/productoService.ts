import axios from 'axios';
import type { Producto, Categoria} from '../Types/Producto';

const API_URL = 'http://localhost:8080/api/productos';

export const productoService = {
  getAll: async (): Promise<Producto[]> => {
    const response = await axios.get<Producto[]>(API_URL);
    return response.data;
  },

  getCategorias: async (): Promise<Categoria[]> => {
    // Consulta las categorías al backend
    const response = await axios.get<Categoria[]>(`${API_URL}/categorias`);
    return response.data;
  }
};

export default productoService;