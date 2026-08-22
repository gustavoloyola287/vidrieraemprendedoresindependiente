import {  type Producto } from '../Types/Producto';

const API_URL = 'http://localhost:8080/api/productos';

export const getProductos = async (): Promise<Producto[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return response.json();
};