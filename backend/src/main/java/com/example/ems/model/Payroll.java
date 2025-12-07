package com.example.ems.model;

import jakarta.persistence.*;

@Entity
@Table(name = "payroll")
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payrollId; // payroll_ID (PK)

    @ManyToOne
    @JoinColumn(name = "emp_id", nullable = true)
    private Employee employee; // emp_ID (FK)

    @ManyToOne
    @JoinColumn(name = "job_id")
    private JobDepartment jobDepartment; // job_ID (FK)

    @ManyToOne
    @JoinColumn(name = "salary_id", nullable = true)
    private SalaryBonus salaryBonus; // salary_ID (FK)

    @ManyToOne
    @JoinColumn(name = "leave_id", nullable = true)
    private LeaveRequest leaveRequest; // leave_ID (FK) - optional

    private String date;
    private String report;
    private Double totalAmount;

    // getters and setters
    public Long getPayrollId() { return payrollId; }
    public void setPayrollId(Long payrollId) { this.payrollId = payrollId; }
    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }
    public JobDepartment getJobDepartment() { return jobDepartment; }
    public void setJobDepartment(JobDepartment jobDepartment) { this.jobDepartment = jobDepartment; }
    public SalaryBonus getSalaryBonus() { return salaryBonus; }
    public void setSalaryBonus(SalaryBonus salaryBonus) { this.salaryBonus = salaryBonus; }
    public LeaveRequest getLeaveRequest() { return leaveRequest; }
    public void setLeaveRequest(LeaveRequest leaveRequest) { this.leaveRequest = leaveRequest; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getReport() { return report; }
    public void setReport(String report) { this.report = report; }
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
}
