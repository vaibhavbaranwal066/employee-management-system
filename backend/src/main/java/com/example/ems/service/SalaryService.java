package com.example.ems.service;

import com.example.ems.model.Payroll;
import com.example.ems.model.SalaryBonus;
import com.example.ems.repository.PayrollRepository;
import com.example.ems.repository.SalaryRepository;
import com.example.ems.util.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SalaryService {
    private final SalaryRepository repo;
    private final PayrollRepository payrollRepo;

    public SalaryService(SalaryRepository repo, PayrollRepository payrollRepo) {
        this.repo = repo;
        this.payrollRepo = payrollRepo;
    }

    public List<SalaryBonus> findAll() { return repo.findAll(); }

    public SalaryBonus findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Salary not found: " + id));
    }

    public SalaryBonus create(SalaryBonus s) { return repo.save(s); }

    public SalaryBonus update(Long id, SalaryBonus s) {
        SalaryBonus exist = findById(id);
        exist.setAmount(s.getAmount());
        exist.setAnnual(s.getAnnual());
        exist.setBonus(s.getBonus());
        exist.setJobDepartment(s.getJobDepartment());
        return repo.save(exist);
    }
    public void delete(Long id) {
        // Step 1: detach payroll rows referencing this salary
        List<Payroll> payrolls = payrollRepo.findBySalaryBonus_SalaryId(id);
        for (Payroll p : payrolls) {
            p.setSalaryBonus(null);
            payrollRepo.save(p);
        }

        // Step 2: delete salary bonus entry
        SalaryBonus s = findById(id);
        repo.delete(s);
    }

}
