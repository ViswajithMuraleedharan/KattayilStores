package com.mobilecare.controller;

import com.mobilecare.dto.RepairDto;
import com.mobilecare.service.RepairService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/repairs")
public class RepairController {

    private final RepairService repairService;

    public RepairController(RepairService repairService) {
        this.repairService = repairService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RepairDto.Response> createRepair(
            @Valid @RequestPart("data") RepairDto.CreateRequest req,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repairService.createRepair(req, images));
    }

    @GetMapping("/track")
    public ResponseEntity<RepairDto.Response> trackRepair(@RequestParam String query) {
        return ResponseEntity.ok(repairService.trackRepair(query));
    }

    @GetMapping
    public ResponseEntity<List<RepairDto.Response>> getAllRepairs() {
        return ResponseEntity.ok(repairService.getAllRepairs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RepairDto.Response> getRepairById(@PathVariable Long id) {
        return ResponseEntity.ok(repairService.getRepairById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RepairDto.Response> updateRepair(
            @PathVariable Long id,
            @RequestBody RepairDto.UpdateRequest req) {
        return ResponseEntity.ok(repairService.updateRepair(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepair(@PathVariable Long id) {
        repairService.deleteRepair(id);
        return ResponseEntity.noContent().build();
    }
}
