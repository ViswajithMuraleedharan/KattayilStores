package com.mobilecare.dto;

import java.math.BigDecimal;

public class DashboardDto {
    private long totalRepairs;
    private long pendingRepairs;
    private long completedRepairs;
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long unreadMessages;

    public DashboardDto(long totalRepairs, long pendingRepairs, long completedRepairs,
                        long totalOrders, BigDecimal totalRevenue, long unreadMessages) {
        this.totalRepairs = totalRepairs;
        this.pendingRepairs = pendingRepairs;
        this.completedRepairs = completedRepairs;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
        this.unreadMessages = unreadMessages;
    }

    public long getTotalRepairs() { return totalRepairs; }
    public long getPendingRepairs() { return pendingRepairs; }
    public long getCompletedRepairs() { return completedRepairs; }
    public long getTotalOrders() { return totalOrders; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public long getUnreadMessages() { return unreadMessages; }
}
