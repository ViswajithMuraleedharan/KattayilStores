package com.mobilecare.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "repairs")
public class Repair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String ticketId;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String deviceBrand;

    @Column(nullable = false)
    private String deviceModel;

    @Column(nullable = false)
    private String issueCategory;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RepairStatus status = RepairStatus.PENDING;

    private LocalDate estimatedCompletion;

    @Column(columnDefinition = "TEXT")
    private String technicianNotes;

    @ElementCollection
    @CollectionTable(name = "repair_images", joinColumns = @JoinColumn(name = "repair_id"))
    @Column(name = "image_path")
    private List<String> imagePaths = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum RepairStatus {
        PENDING, CHECKING, WAITING_FOR_PARTS, REPAIRING, COMPLETED, DELIVERED
    }

    public Repair() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDeviceBrand() { return deviceBrand; }
    public void setDeviceBrand(String deviceBrand) { this.deviceBrand = deviceBrand; }
    public String getDeviceModel() { return deviceModel; }
    public void setDeviceModel(String deviceModel) { this.deviceModel = deviceModel; }
    public String getIssueCategory() { return issueCategory; }
    public void setIssueCategory(String issueCategory) { this.issueCategory = issueCategory; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public RepairStatus getStatus() { return status; }
    public void setStatus(RepairStatus status) { this.status = status; }
    public LocalDate getEstimatedCompletion() { return estimatedCompletion; }
    public void setEstimatedCompletion(LocalDate estimatedCompletion) { this.estimatedCompletion = estimatedCompletion; }
    public String getTechnicianNotes() { return technicianNotes; }
    public void setTechnicianNotes(String technicianNotes) { this.technicianNotes = technicianNotes; }
    public List<String> getImagePaths() { return imagePaths; }
    public void setImagePaths(List<String> imagePaths) { this.imagePaths = imagePaths; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
