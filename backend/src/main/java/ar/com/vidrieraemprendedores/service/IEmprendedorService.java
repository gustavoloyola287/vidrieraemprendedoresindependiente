package ar.com.vidrieraemprendedores.service;

import java.util.List;

import ar.com.vidrieraemprendedores.models.Emprendedor;

public interface IEmprendedorService {
    // Traer todos los emprendedores
    List<Emprendedor> listarEmprendedores();

    // Buscar uno solo por su ID
    Emprendedor buscarPorId(Long id);

    // Guardar o crear un nuevo emprendedor
    Emprendedor guardarEmprendedor(Emprendedor emprendedor);

    // Eliminar un emprendedor por su ID
    void eliminarEmprendedor(Long id);
}
