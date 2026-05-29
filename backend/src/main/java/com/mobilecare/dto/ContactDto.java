package com.mobilecare.dto;

import com.mobilecare.entity.ContactMessage;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class ContactDto {

    public static class Request {
        @NotBlank private String name;
        @NotBlank private String phone;
        private String email;
        @NotBlank private String message;

        public String getName() { return name; }
        public void setName(String v) { this.name = v; }
        public String getPhone() { return phone; }
        public void setPhone(String v) { this.phone = v; }
        public String getEmail() { return email; }
        public void setEmail(String v) { this.email = v; }
        public String getMessage() { return message; }
        public void setMessage(String v) { this.message = v; }
    }

    public static class Response {
        private Long id;
        private String name;
        private String phone;
        private String email;
        private String message;
        private Boolean read;
        private LocalDateTime createdAt;

        public static Response from(ContactMessage m) {
            Response res = new Response();
            res.id = m.getId();
            res.name = m.getName();
            res.phone = m.getPhone();
            res.email = m.getEmail();
            res.message = m.getMessage();
            res.read = m.getRead();
            res.createdAt = m.getCreatedAt();
            return res;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getPhone() { return phone; }
        public String getEmail() { return email; }
        public String getMessage() { return message; }
        public Boolean getRead() { return read; }
        public LocalDateTime getCreatedAt() { return createdAt; }
    }
}
