package com.mobilecare.config;

import com.mobilecare.entity.AdminUser;
import com.mobilecare.entity.Product;
import com.mobilecare.repository.AdminUserRepository;
import com.mobilecare.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.logging.Logger;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = Logger.getLogger(DataSeeder.class.getName());

    private final AdminUserRepository adminUserRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    public DataSeeder(AdminUserRepository adminUserRepository,
                      ProductRepository productRepository,
                      PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        seedProducts();
    }

    private void seedAdmin() {
        if (!adminUserRepository.existsByUsername(adminUsername)) {
            AdminUser admin = new AdminUser();
            admin.setUsername(adminUsername);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            adminUserRepository.save(admin);
            log.info("Admin user created: " + adminUsername);
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = List.of(
                product("Fast Charge Adapter 65W", "Chargers", new BigDecimal("899"),
                    "65W GaN fast charger compatible with all USB-C devices.",
                    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80", 15, 4.5),
                product("Transparent Phone Cover", "Covers", new BigDecimal("199"),
                    "Crystal clear TPU case with military-grade drop protection.",
                    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", 42, 4.2),
                product("Tempered Glass Screen Guard", "Screen Guards", new BigDecimal("149"),
                    "9H hardness tempered glass with oleophobic coating.",
                    "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&q=80", 60, 4.7),
                product("Wireless Earbuds Pro", "Headphones", new BigDecimal("1499"),
                    "True wireless earbuds with active noise cancellation.",
                    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", 8, 4.4),
                product("USB-C Braided Cable 2m", "Accessories", new BigDecimal("299"),
                    "Nylon braided USB-C cable with 100W power delivery.",
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", 35, 4.3),
                product("Magnetic Car Mount", "Accessories", new BigDecimal("449"),
                    "Strong magnetic car mount with 360 degree rotation.",
                    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80", 20, 4.1),
                product("20W PD Wall Charger", "Chargers", new BigDecimal("599"),
                    "20W Power Delivery wall charger for iPhone and Android.",
                    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80", 25, 4.6),
                product("Leather Flip Cover", "Covers", new BigDecimal("349"),
                    "Premium PU leather flip cover with card slots.",
                    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", 18, 4.0)
            );
            productRepository.saveAll(products);
            log.info("Sample products seeded: " + products.size());
        }
    }

    private Product product(String name, String category, BigDecimal price,
                             String description, String imageUrl, int stock, double rating) {
        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setDescription(description);
        p.setImageUrl(imageUrl);
        p.setStock(stock);
        p.setRating(rating);
        p.setReviewCount(0);
        p.setActive(true);
        return p;
    }
}
