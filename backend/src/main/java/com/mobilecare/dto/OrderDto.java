package com.mobilecare.dto;

import com.mobilecare.entity.Order;
import com.mobilecare.entity.OrderItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    public static class ItemRequest {
        @NotNull private Long productId;
        @NotNull private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long v) { this.productId = v; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer v) { this.quantity = v; }
    }

    public static class CreateRequest {
        @NotBlank private String customerName;
        @NotBlank private String phone;
        private String address;
        private Order.DeliveryType deliveryType = Order.DeliveryType.PICKUP;
        private Order.PaymentMethod paymentMethod = Order.PaymentMethod.COD;
        @NotEmpty private List<ItemRequest> items;

        public String getCustomerName() { return customerName; }
        public void setCustomerName(String v) { this.customerName = v; }
        public String getPhone() { return phone; }
        public void setPhone(String v) { this.phone = v; }
        public String getAddress() { return address; }
        public void setAddress(String v) { this.address = v; }
        public Order.DeliveryType getDeliveryType() { return deliveryType; }
        public void setDeliveryType(Order.DeliveryType v) { this.deliveryType = v; }
        public Order.PaymentMethod getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(Order.PaymentMethod v) { this.paymentMethod = v; }
        public List<ItemRequest> getItems() { return items; }
        public void setItems(List<ItemRequest> v) { this.items = v; }
    }

    public static class UpdateStatusRequest {
        @NotNull private Order.OrderStatus status;

        public Order.OrderStatus getStatus() { return status; }
        public void setStatus(Order.OrderStatus v) { this.status = v; }
    }

    public static class ItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal lineTotal;

        public static ItemResponse from(OrderItem i) {
            ItemResponse res = new ItemResponse();
            res.productId = i.getProduct().getId();
            res.productName = i.getProduct().getName();
            res.quantity = i.getQuantity();
            res.unitPrice = i.getUnitPrice();
            res.lineTotal = i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity()));
            return res;
        }

        public Long getProductId() { return productId; }
        public String getProductName() { return productName; }
        public Integer getQuantity() { return quantity; }
        public BigDecimal getUnitPrice() { return unitPrice; }
        public BigDecimal getLineTotal() { return lineTotal; }
    }

    public static class Response {
        private Long id;
        private String orderId;
        private String customerName;
        private String phone;
        private String address;
        private Order.DeliveryType deliveryType;
        private Order.PaymentMethod paymentMethod;
        private Order.OrderStatus status;
        private BigDecimal subtotal;
        private BigDecimal tax;
        private BigDecimal total;
        private List<ItemResponse> items;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static Response from(Order o) {
            Response res = new Response();
            res.id = o.getId();
            res.orderId = o.getOrderId();
            res.customerName = o.getCustomerName();
            res.phone = o.getPhone();
            res.address = o.getAddress();
            res.deliveryType = o.getDeliveryType();
            res.paymentMethod = o.getPaymentMethod();
            res.status = o.getStatus();
            res.subtotal = o.getSubtotal();
            res.tax = o.getTax();
            res.total = o.getTotal();
            res.items = o.getItems().stream().map(ItemResponse::from).toList();
            res.createdAt = o.getCreatedAt();
            res.updatedAt = o.getUpdatedAt();
            return res;
        }

        public Long getId() { return id; }
        public String getOrderId() { return orderId; }
        public String getCustomerName() { return customerName; }
        public String getPhone() { return phone; }
        public String getAddress() { return address; }
        public Order.DeliveryType getDeliveryType() { return deliveryType; }
        public Order.PaymentMethod getPaymentMethod() { return paymentMethod; }
        public Order.OrderStatus getStatus() { return status; }
        public BigDecimal getSubtotal() { return subtotal; }
        public BigDecimal getTax() { return tax; }
        public BigDecimal getTotal() { return total; }
        public List<ItemResponse> getItems() { return items; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
    }
}
