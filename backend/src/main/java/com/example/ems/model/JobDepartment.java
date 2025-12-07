package com.example.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "job_department")
@JsonIgnoreProperties({"employees"})
public class JobDepartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId; // job_ID (PK)

    private String jobDept;
    private String name;
    private String description;
    private String salaryRange;

    @OneToMany(mappedBy = "jobDepartment", cascade = CascadeType.ALL)

    private Set<Employee> employees;

    // getters and setters
    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public String getJobDept() { return jobDept; }
    public void setJobDept(String jobDept) { this.jobDept = jobDept; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }
    public Set<Employee> getEmployees() { return employees; }
    public void setEmployees(Set<Employee> employees) { this.employees = employees; }
}
