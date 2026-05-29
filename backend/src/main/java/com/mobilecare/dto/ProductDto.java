package com.mobilecare.dto;

import com.mobilecare.entity.Product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductDto {

    public static class CreateRequest {
        @NotBlank private String name;
        @NotBlank private String category;
        @NotNull @Min(0) private BigDecimal price;
        private String description;
        private String imageUrl;
        @Min(0) private Integer stock = 0;

        public String getName() { return name; }
        public void setName(String v) { this.name = v; }
        public String getCategory() { return category; }
        public void setCategory(String v) { this.category = v; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal v) { this.price = v; }
        public String getDescription() { return description; }
        public void setDescription(String v) { this.description = v; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String v) { this.imageUrl = v; }
        public Integer getStock() { return stock; }
        public void setStock(Integer v) { this.stock = v; }
    }

    public static class UpdateRequest {
        private String name;
        private String category;
        private BigDecimal price;
        private String description;
        private String imageUrl;
        private Integer stock;
        private Boolean active;

        public String getName() { return name; }
        public void setName(String v) { this.name = v; }
        public String getCategory() { return category; }
        public void setCategory(String v) { this.category = v; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal v) { this.price = v; }
        public String getDescription() { return description; }
        public void setDescription(String v) { this.description = v; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String v) { this.imageUrl = v; }
        public Integer getStock() { return stock; }
        public void setStock(Integer v) { this.stock = v; }
        public Boolean getActive() { return active; }
        public void setActive(Boolean v) { this.active = v; }
    }

    public static class Response {
        private Long id;
        private String name;
        private String category;
        private BigDecimal price;
        private String description;
        private String imageUrl;
        private Integer stock;
        private Double rating;
        private Integer reviewCount;
        private Boolean active;
        private LocalDateTime createdAt;

        public static Response from(Product p) {
            Response res = new Response();
            res.id = p.getId();
            res.name = p.getName();
            res.category = p.getCategory();
            res.price = p.getPrice();
            res.description = p.getDescription();
            res.imageUrl = p.getImageUrl();
            res.stock = p.getStock();
            res.rating = p.getRating();
            res.reviewCount = p.getReviewCount();
            res.active = p.getActive();
            res.createdAt = p.getCreatedAt();
            return res;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getCategory() { return category; }
        public BigDecimal getPrice() { return price; }
        public String getDescription() { return description; }
        public String getImageUrl() { return imageUrl; }
        public Integer getStock() { return stock; }
        public Double getRating() { return rating; }
        public Integer getReviewCount() { return reviewCount; }
        public Boolean getActive() { return active; }
        public LocalDateTime getCreatedAt() { return createdAt; }
    }
}
