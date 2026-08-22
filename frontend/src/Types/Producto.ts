import { type Emprendedor } from "./Emprendedor";

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  emprendedor: Emprendedor;
  categoria: Categoria;
}