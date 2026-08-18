package ar.com.vidrieraemprendedores.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import ar.com.vidrieraemprendedores.models.Producto;


public interface ProductoRepository extends JpaRepository<Producto, Long> {
}