package ar.com.vidrieraemprendedores.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import ar.com.vidrieraemprendedores.models.Categoria;


public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
