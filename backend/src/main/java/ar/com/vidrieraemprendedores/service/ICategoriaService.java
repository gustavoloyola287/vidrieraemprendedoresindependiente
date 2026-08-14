package ar.com.vidrieraemprendedores.service;

import java.util.List;

import ar.com.vidrieraemprendedores.models.Categoria;

public interface ICategoriaService {
    // Listar todas las categorías
    List<Categoria> listarCategorias();

    // Buscar una categoría por ID
    Categoria buscarPorId(Long id);

    // Guardar o actualizar una categoría
    Categoria guardarCategoria(Categoria categoria);

    // Eliminar una categoría por ID
    void eliminarCategoria(Long id);
}
