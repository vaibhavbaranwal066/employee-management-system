package com.example.ems.repository;

import com.example.ems.model.SalaryBonus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaryRepository extends JpaRepository<SalaryBonus, Long> {
}
