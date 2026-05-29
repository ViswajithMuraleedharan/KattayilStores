package com.mobilecare.repository;

import com.mobilecare.entity.Repair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepairRepository extends JpaRepository<Repair, Long> {
    Optional<Repair> findByTicketId(String ticketId);
    Optional<Repair> findByTicketIdOrPhone(String ticketId, String phone);
    List<Repair> findByPhone(String phone);
    List<Repair> findByStatus(Repair.RepairStatus status);
    long countByStatus(Repair.RepairStatus status);

    @Query("SELECT r FROM Repair r ORDER BY r.createdAt DESC")
    List<Repair> findAllOrderByCreatedAtDesc();
}
