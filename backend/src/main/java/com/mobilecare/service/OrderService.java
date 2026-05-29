package com.mobilecare.service;

import com.mobilecare.dto.OrderDto;
import com.mobilecare.entity.Order;
import com.mobilecare.entity.OrderItem;
import com.mobilecare.entity.Product;
import com.mobilecare.exception.ResourceNotFoundException;
import com.mobilecare.repository.OrderRepository;
import com.mobilecare.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public OrderDto.Response createOrder(OrderDto.CreateRequest req) {
        Order order = new Order();
        order.setOrderId(generateOrderId());
        order.setCustomerName(req.getCustomerName());
        order.setPhone(req.getPhone());
        order.setAddress(req.getAddress());
        order.setDeliveryType(req.getDeliveryType());
        order.setPaymentMethod(req.getPaymentMethod());
        order.setStatus(Order.OrderStatus.PENDING);

        BigDecimal subtotal = BigDecimal.ZERO;
        for (OrderDto.ItemRequest itemReq : req.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + itemReq.getProductId()));
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(product.getPrice());
            order.getItems().add(item);
            subtotal = subtotal.add(product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
        }

        BigDecimal tax = subtotal.multiply(new BigDecimal("0.18")).setScale(2, RoundingMode.HALF_UP);
        order.setSubtotal(subtotal);
        order.setTax(tax);
        order.setTotal(subtotal.add(tax));

        return OrderDto.Response.from(orderRepository.save(order));
    }

    public List<OrderDto.Response> getAllOrders() {
        return orderRepository.findAllOrderByCreatedAtDesc()
                .stream().map(OrderDto.Response::from).toList();
    }

    public OrderDto.Response getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(OrderDto.Response::from)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
    }

    public List<OrderDto.Response> getOrdersByPhone(String phone) {
        return orderRepository.findByPhone(phone)
                .stream().map(OrderDto.Response::from).toList();
    }

    public OrderDto.Response updateOrderStatus(Long id, OrderDto.UpdateStatusRequest req) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
        order.setStatus(req.getStatus());
        return OrderDto.Response.from(orderRepository.save(order));
    }

    private String generateOrderId() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        return "ORD-" + timestamp + "-" + ((int)(Math.random() * 9000) + 1000);
    }
}
