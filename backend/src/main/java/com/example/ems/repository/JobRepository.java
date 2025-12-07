package com.example.ems.repository;

import com.example.ems.model.JobDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobDepartment, Long> {
}
