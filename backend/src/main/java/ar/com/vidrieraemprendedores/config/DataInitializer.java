package ar.com.vidrieraemprendedores.config;

import ar.com.vidrieraemprendedores.models.Categoria;
import ar.com.vidrieraemprendedores.models.Emprendedor;
import ar.com.vidrieraemprendedores.models.Producto;
import ar.com.vidrieraemprendedores.models.Rol;
import ar.com.vidrieraemprendedores.repository.CategoriaRepository;
import ar.com.vidrieraemprendedores.repository.EmprendedorRepository;
import ar.com.vidrieraemprendedores.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EmprendedorRepository emprendedorRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(EmprendedorRepository emprendedorRepository,
                           CategoriaRepository categoriaRepository,
                           ProductoRepository productoRepository,
                           PasswordEncoder passwordEncoder) {
        this.emprendedorRepository = emprendedorRepository;
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Ejecuta la carga inicial solo si no existen emprendedores guardados
        if (emprendedorRepository.count() == 0) {

            // 1. Crear Categorías
            Categoria catPlantas = new Categoria();
            catPlantas.setNombre("Plantas");
            categoriaRepository.save(catPlantas);

            Categoria catReposteria = new Categoria();
            catReposteria.setNombre("Repostería");
            categoriaRepository.save(catReposteria);

            // 2. Crear Emprendedores
            Emprendedor empPlantas = new Emprendedor();
            empPlantas.setNombreCompleto("Lucía Fernández");
            empPlantas.setNombreEmprendimiento(" Vivero Verde Serrano");
            empPlantas.setDescripcion("Cultivo y venta de plantas ornamentales y suculentas.");
            empPlantas.setEmail("vivero@sierras.com");
            empPlantas.setTelefono("3541-112233");
            empPlantas.setPassword(passwordEncoder.encode("12345678"));
            empPlantas.setRol(Rol.ROLE_EMPRENDEDOR);
            emprendedorRepository.save(empPlantas);

            Emprendedor empReposteria = new Emprendedor();
            empReposteria.setNombreCompleto("Martín Gómez");
            empReposteria.setNombreEmprendimiento(" Sabor Serrano Alfajores");
            empReposteria.setDescripcion("Elaboración artesanal de alfajores tradicionales.");
            empReposteria.setEmail("contacto@saborserrano.com");
            empReposteria.setTelefono("3541-445566");
            empReposteria.setPassword(passwordEncoder.encode("12345678"));
            empReposteria.setRol(Rol.ROLE_EMPRENDEDOR);
            emprendedorRepository.save(empReposteria);

            // 3. Crear Productos (Ajusta los nombres de las imágenes si hace falta)
            
            // --- Plantas ---
            Producto p1 = new Producto();
            p1.setNombre("Cordyline en Maceta");
            p1.setDescripcion("Planta Cordyline ideal para interiores.");
            p1.setUrlImagen("productos/Cordyline.jpeg"); // Nombre de la foto en la carpeta public del frontend
            p1.setEmprendedor(empPlantas);
            p1.setCategoria(catPlantas);
            productoRepository.save(p1);

            Producto p2 = new Producto();
            p2.setNombre("Jazmin Serrano");
            p2.setDescripcion("Jazmin de la sierra.");
            p2.setUrlImagen("productos/Jazmin.jpeg");
            p2.setEmprendedor(empPlantas);
            p2.setCategoria(catPlantas);
            productoRepository.save(p2);

            // --- Repostería ---
            Producto p3 = new Producto();
            p3.setNombre("Alfajores de Dulce de Leche Glaseados");
            p3.setDescripcion("Alfajores artesanales glaseados 6 unidades.");
            p3.setUrlImagen("productos/AlfajoresGlaseados.jpeg");
            p3.setEmprendedor(empReposteria);
            p3.setCategoria(catReposteria);
            productoRepository.save(p3);

            Producto p4 = new Producto();
            p4.setNombre("Alfajores de Dulce de Leche Bañados en Chocolate");
            p4.setDescripcion("Variedad de alfajores de dulce de leche bañados en chocolate 6 unidades.");
            p4.setUrlImagen("productos/Alfajoresbanochoco.jpeg");
            p4.setEmprendedor(empReposteria);
            p4.setCategoria(catReposteria);
            productoRepository.save(p4);
        }
    }
}