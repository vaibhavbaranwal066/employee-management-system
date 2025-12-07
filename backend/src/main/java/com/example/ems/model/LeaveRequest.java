package com.example.ems.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "leave_request")
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveId; // leave_ID (PK)

    @ManyToOne
    @JoinColumn(name = "emp_id")
    @JsonBackReference  // prevents serializing employee inside leave (avoids recursion)

    private Employee employee; // emp_ID (FK)

    private String date;
    private String reason;

    // getters and setters
    public Long getLeaveId() { return leaveId; }
    public void setLeaveId(Long leaveId) { this.leaveId = leaveId; }
    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
