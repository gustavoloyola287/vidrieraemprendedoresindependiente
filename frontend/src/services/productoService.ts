import api from '../api';
import type { Producto, Categoria } from '../Types/Producto';

export const productoService = {
  getAll: async (): Promise<Producto[]> => {
    try {
      const response = await api.get<Producto[]>('/productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      throw error;
    }
  },

  getCategorias: async (): Promise<Categoria[]> => {
    try {
      const response = await api.get<Categoria[]>('/productos/categorias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw error;
    }
  }
};

export default productoService;