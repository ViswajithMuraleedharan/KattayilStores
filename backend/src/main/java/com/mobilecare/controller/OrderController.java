package com.mobilecare.controller;

import com.mobilecare.dto.OrderDto;
import com.mobilecare.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDto.Response> createOrder(@Valid @RequestBody OrderDto.CreateRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(req));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderDto.Response>> getMyOrders(@RequestParam String phone) {
        return ResponseEntity.ok(orderService.getOrdersByPhone(phone));
    }

    @GetMapping
    public ResponseEntity<List<OrderDto.Response>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto.Response> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDto.Response> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody OrderDto.UpdateStatusRequest req) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, req));
    }
}
