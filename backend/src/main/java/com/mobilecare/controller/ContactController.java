package com.mobilecare.controller;

import com.mobilecare.dto.ContactDto;
import com.mobilecare.dto.DashboardDto;
import com.mobilecare.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/api/contact")
    public ResponseEntity<ContactDto.Response> sendMessage(@Valid @RequestBody ContactDto.Request req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.saveMessage(req));
    }

    @GetMapping("/api/contact")
    public ResponseEntity<List<ContactDto.Response>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @PutMapping("/api/contact/{id}/read")
    public ResponseEntity<ContactDto.Response> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    @GetMapping("/api/admin/dashboard")
    public ResponseEntity<DashboardDto> getDashboard() {
        return ResponseEntity.ok(contactService.getDashboardStats());
    }
}
