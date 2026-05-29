package com.mobilecare.service;

import com.mobilecare.dto.ContactDto;
import com.mobilecare.dto.DashboardDto;
import com.mobilecare.entity.ContactMessage;
import com.mobilecare.entity.Repair;
import com.mobilecare.exception.ResourceNotFoundException;
import com.mobilecare.repository.ContactMessageRepository;
import com.mobilecare.repository.OrderRepository;
import com.mobilecare.repository.RepairRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final RepairRepository repairRepository;
    private final OrderRepository orderRepository;

    public ContactService(ContactMessageRepository contactMessageRepository,
                          RepairRepository repairRepository,
                          OrderRepository orderRepository) {
        this.contactMessageRepository = contactMessageRepository;
        this.repairRepository = repairRepository;
        this.orderRepository = orderRepository;
    }

    public ContactDto.Response saveMessage(ContactDto.Request req) {
        ContactMessage msg = new ContactMessage();
        msg.setName(req.getName());
        msg.setPhone(req.getPhone());
        msg.setEmail(req.getEmail());
        msg.setMessage(req.getMessage());
        return ContactDto.Response.from(contactMessageRepository.save(msg));
    }

    public List<ContactDto.Response> getAllMessages() {
        return contactMessageRepository.findAll()
                .stream().map(ContactDto.Response::from).toList();
    }

    public ContactDto.Response markAsRead(Long id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
        msg.setRead(true);
        return ContactDto.Response.from(contactMessageRepository.save(msg));
    }

    public DashboardDto getDashboardStats() {
        long totalRepairs = repairRepository.count();
        long pendingRepairs = repairRepository.countByStatus(Repair.RepairStatus.PENDING)
                + repairRepository.countByStatus(Repair.RepairStatus.CHECKING);
        long completedRepairs = repairRepository.countByStatus(Repair.RepairStatus.COMPLETED)
                + repairRepository.countByStatus(Repair.RepairStatus.DELIVERED);
        long totalOrders = orderRepository.count();
        var revenue = orderRepository.getTotalRevenue();
        long unreadMessages = contactMessageRepository.countByReadFalse();
        return new DashboardDto(totalRepairs, pendingRepairs, completedRepairs,
                totalOrders, revenue, unreadMessages);
    }
}
