package com.mobilecare.dto;

import com.mobilecare.entity.Repair;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class RepairDto {

    public static class CreateRequest {
        @NotBlank private String customerName;
        @NotBlank @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits") private String phone;
        @NotBlank private String deviceBrand;
        @NotBlank private String deviceModel;
        @NotBlank private String issueCategory;
        private String description;

        public String getCustomerName() { return customerName; }
        public void setCustomerName(String v) { this.customerName = v; }
        public String getPhone() { return phone; }
        public void setPhone(String v) { this.phone = v; }
        public String getDeviceBrand() { return deviceBrand; }
        public void setDeviceBrand(String v) { this.deviceBrand = v; }
        public String getDeviceModel() { return deviceModel; }
        public void setDeviceModel(String v) { this.deviceModel = v; }
        public String getIssueCategory() { return issueCategory; }
        public void setIssueCategory(String v) { this.issueCategory = v; }
        public String getDescription() { return description; }
        public void setDescription(String v) { this.description = v; }
    }

    public static class UpdateRequest {
        private Repair.RepairStatus status;
        private String technicianNotes;
        private LocalDate estimatedCompletion;

        public Repair.RepairStatus getStatus() { return status; }
        public void setStatus(Repair.RepairStatus v) { this.status = v; }
        public String getTechnicianNotes() { return technicianNotes; }
        public void setTechnicianNotes(String v) { this.technicianNotes = v; }
        public LocalDate getEstimatedCompletion() { return estimatedCompletion; }
        public void setEstimatedCompletion(LocalDate v) { this.estimatedCompletion = v; }
    }

    public static class Response {
        private Long id;
        private String ticketId;
        private String customerName;
        private String phone;
        private String deviceBrand;
        private String deviceModel;
        private String issueCategory;
        private String description;
        private Repair.RepairStatus status;
        private LocalDate estimatedCompletion;
        private String technicianNotes;
        private List<String> imagePaths;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static Response from(Repair r) {
            Response res = new Response();
            res.id = r.getId();
            res.ticketId = r.getTicketId();
            res.customerName = r.getCustomerName();
            res.phone = r.getPhone();
            res.deviceBrand = r.getDeviceBrand();
            res.deviceModel = r.getDeviceModel();
            res.issueCategory = r.getIssueCategory();
            res.description = r.getDescription();
            res.status = r.getStatus();
            res.estimatedCompletion = r.getEstimatedCompletion();
            res.technicianNotes = r.getTechnicianNotes();
            res.imagePaths = r.getImagePaths();
            res.createdAt = r.getCreatedAt();
            res.updatedAt = r.getUpdatedAt();
            return res;
        }

        public Long getId() { return id; }
        public String getTicketId() { return ticketId; }
        public String getCustomerName() { return customerName; }
        public String getPhone() { return phone; }
        public String getDeviceBrand() { return deviceBrand; }
        public String getDeviceModel() { return deviceModel; }
        public String getIssueCategory() { return issueCategory; }
        public String getDescription() { return description; }
        public Repair.RepairStatus getStatus() { return status; }
        public LocalDate getEstimatedCompletion() { return estimatedCompletion; }
        public String getTechnicianNotes() { return technicianNotes; }
        public List<String> getImagePaths() { return imagePaths; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
    }
}
