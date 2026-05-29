package com.mobilecare.service;

import com.mobilecare.dto.RepairDto;
import com.mobilecare.entity.Repair;
import com.mobilecare.exception.ResourceNotFoundException;
import com.mobilecare.repository.RepairRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RepairService {

    private final RepairRepository repairRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public RepairService(RepairRepository repairRepository) {
        this.repairRepository = repairRepository;
    }

    public RepairDto.Response createRepair(RepairDto.CreateRequest req, List<MultipartFile> images) {
        Repair repair = new Repair();
        repair.setTicketId(generateTicketId());
        repair.setCustomerName(req.getCustomerName());
        repair.setPhone(req.getPhone());
        repair.setDeviceBrand(req.getDeviceBrand());
        repair.setDeviceModel(req.getDeviceModel());
        repair.setIssueCategory(req.getIssueCategory());
        repair.setDescription(req.getDescription());
        repair.setStatus(Repair.RepairStatus.PENDING);

        if (images != null && !images.isEmpty()) {
            repair.setImagePaths(saveImages(images));
        }

        return RepairDto.Response.from(repairRepository.save(repair));
    }

    public RepairDto.Response trackRepair(String query) {
        return repairRepository.findByTicketIdOrPhone(query, query)
                .map(RepairDto.Response::from)
                .orElseThrow(() -> new ResourceNotFoundException("No repair found for: " + query));
    }

    public List<RepairDto.Response> getAllRepairs() {
        return repairRepository.findAllOrderByCreatedAtDesc()
                .stream().map(RepairDto.Response::from).toList();
    }

    public RepairDto.Response getRepairById(Long id) {
        return repairRepository.findById(id)
                .map(RepairDto.Response::from)
                .orElseThrow(() -> new ResourceNotFoundException("Repair not found: " + id));
    }

    public RepairDto.Response updateRepair(Long id, RepairDto.UpdateRequest req) {
        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Repair not found: " + id));
        if (req.getStatus() != null) repair.setStatus(req.getStatus());
        if (req.getTechnicianNotes() != null) repair.setTechnicianNotes(req.getTechnicianNotes());
        if (req.getEstimatedCompletion() != null) repair.setEstimatedCompletion(req.getEstimatedCompletion());
        return RepairDto.Response.from(repairRepository.save(repair));
    }

    public void deleteRepair(Long id) {
        if (!repairRepository.existsById(id))
            throw new ResourceNotFoundException("Repair not found: " + id);
        repairRepository.deleteById(id);
    }

    private String generateTicketId() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        return "MC-" + timestamp + "-" + ((int)(Math.random() * 9000) + 1000);
    }

    private List<String> saveImages(List<MultipartFile> files) {
        List<String> paths = new ArrayList<>();
        try {
            Path dir = Paths.get(uploadDir, "repairs");
            Files.createDirectories(dir);
            for (MultipartFile file : files) {
                if (file.isEmpty()) continue;
                String ext = getExtension(file.getOriginalFilename());
                String filename = UUID.randomUUID() + ext;
                Files.copy(file.getInputStream(), dir.resolve(filename));
                paths.add("repairs/" + filename);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to save images", e);
        }
        return paths;
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return ".jpg";
        return filename.substring(filename.lastIndexOf("."));
    }
}
