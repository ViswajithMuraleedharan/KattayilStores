package com.mobilecare.service;

import com.mobilecare.dto.ProductDto;
import com.mobilecare.entity.Product;
import com.mobilecare.exception.ResourceNotFoundException;
import com.mobilecare.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto.Response> getProducts(String category, String search) {
        List<Product> products;
        if (StringUtils.hasText(search)) {
            products = productRepository.findByNameContainingIgnoreCaseAndActiveTrue(search);
        } else if (StringUtils.hasText(category) && !category.equalsIgnoreCase("all")) {
            products = productRepository.findByCategoryAndActiveTrue(category);
        } else {
            products = productRepository.findByActiveTrue();
        }
        return products.stream().map(ProductDto.Response::from).toList();
    }

    public List<ProductDto.Response> getAllProductsAdmin() {
        return productRepository.findAll().stream().map(ProductDto.Response::from).toList();
    }

    public ProductDto.Response getProductById(Long id) {
        return productRepository.findById(id)
                .map(ProductDto.Response::from)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    public ProductDto.Response createProduct(ProductDto.CreateRequest req) {
        Product p = new Product();
        p.setName(req.getName());
        p.setCategory(req.getCategory());
        p.setPrice(req.getPrice());
        p.setDescription(req.getDescription());
        p.setImageUrl(req.getImageUrl());
        p.setStock(req.getStock());
        p.setActive(true);
        return ProductDto.Response.from(productRepository.save(p));
    }

    public ProductDto.Response updateProduct(Long id, ProductDto.UpdateRequest req) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
        if (req.getName() != null) p.setName(req.getName());
        if (req.getCategory() != null) p.setCategory(req.getCategory());
        if (req.getPrice() != null) p.setPrice(req.getPrice());
        if (req.getDescription() != null) p.setDescription(req.getDescription());
        if (req.getImageUrl() != null) p.setImageUrl(req.getImageUrl());
        if (req.getStock() != null) p.setStock(req.getStock());
        if (req.getActive() != null) p.setActive(req.getActive());
        return ProductDto.Response.from(productRepository.save(p));
    }

    public void deleteProduct(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
        p.setActive(false);
        productRepository.save(p);
    }
}
