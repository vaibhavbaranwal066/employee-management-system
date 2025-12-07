package com.example.ems.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "qualification")
public class Qualification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qualId; // qual_ID (PK)

    @ManyToOne
    @JoinColumn(name = "emp_id")
    @JsonBackReference // prevents serializing employee inside qualification (avoids recursion)

    private Employee employee; // emp_ID (FK)

    private String position;
    private String requirements;
    private String dateIn;

    // getters and setters
    public Long getQualId() { return qualId; }
    public void setQualId(Long qualId) { this.qualId = qualId; }
    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getRequirements() { return requirements; }
    public void setRequirements(String requirements) { this.requirements = requirements; }
    public String getDateIn() { return dateIn; }
    public void setDateIn(String dateIn) { this.dateIn = dateIn; }
}
