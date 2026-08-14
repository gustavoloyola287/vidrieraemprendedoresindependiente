package ar.com.vidrieraemprendedores.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ar.com.vidrieraemprendedores.models.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
