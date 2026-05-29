package com.mobilecare.controller;

import com.mobilecare.dto.ProductDto;
import com.mobilecare.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto.Response>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.getProducts(category, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto.Response> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<ProductDto.Response>> getAllProductsAdmin() {
        return ResponseEntity.ok(productService.getAllProductsAdmin());
    }

    @PostMapping
    public ResponseEntity<ProductDto.Response> createProduct(@Valid @RequestBody ProductDto.CreateRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto.Response> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDto.UpdateRequest req) {
        return ResponseEntity.ok(productService.updateProduct(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
