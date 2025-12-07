package com.example.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId; // emp_ID (PK)

    private String fname;
    private String lname;
    private String gender;
    private Integer age;
    private String contactAdd;
    private String empEmail;
    private String empPass;

    @ManyToOne

    @JoinColumn(name = "job_id")
    private JobDepartment jobDepartment;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference // serializes qualifications but they won't write back the employee object

    private Set<Qualification> qualifications;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference // serializes leaves but they won't write back the employee object

    private Set<LeaveRequest> leaves;


    // getters and setters
    public Long getEmpId() { return empId; }
    public void setEmpId(Long empId) { this.empId = empId; }
    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }
    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getContactAdd() { return contactAdd; }
    public void setContactAdd(String contactAdd) { this.contactAdd = contactAdd; }
    public String getEmpEmail() { return empEmail; }
    public void setEmpEmail(String empEmail) { this.empEmail = empEmail; }
    public String getEmpPass() { return empPass; }
    public void setEmpPass(String empPass) { this.empPass = empPass; }
    public JobDepartment getJobDepartment() { return jobDepartment; }
    public void setJobDepartment(JobDepartment jobDepartment) { this.jobDepartment = jobDepartment; }
    public Set<Qualification> getQualifications() { return qualifications; }
    public void setQualifications(Set<Qualification> qualifications) { this.qualifications = qualifications; }
    public Set<LeaveRequest> getLeaves() { return leaves; }
    public void setLeaves(Set<LeaveRequest> leaves) { this.leaves = leaves; }
}
