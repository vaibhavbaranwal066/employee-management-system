package com.example.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "salary_bonus")
public class SalaryBonus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long salaryId; // salary_Id (PK)

    @ManyToOne
    @JoinColumn(name = "job_id")
    @JsonIgnoreProperties({"employees"})
    private JobDepartment jobDepartment; // job_ID (FK)

    private Double amount;
    private Double annual;
    private Double bonus;

    // getters and setters
    public Long getSalaryId() { return salaryId; }
    public void setSalaryId(Long salaryId) { this.salaryId = salaryId; }
    public JobDepartment getJobDepartment() { return jobDepartment; }
    public void setJobDepartment(JobDepartment jobDepartment) { this.jobDepartment = jobDepartment; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public Double getAnnual() { return annual; }
    public void setAnnual(Double annual) { this.annual = annual; }
    public Double getBonus() { return bonus; }
    public void setBonus(Double bonus) { this.bonus = bonus; }
}
