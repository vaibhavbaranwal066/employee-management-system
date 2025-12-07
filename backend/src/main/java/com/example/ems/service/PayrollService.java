package com.example.ems.service;

import com.example.ems.model.Payroll;
import com.example.ems.repository.PayrollRepository;
import com.example.ems.util.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PayrollService {
    private final PayrollRepository repo;
    public PayrollService(PayrollRepository repo) { this.repo = repo; }

    public List<Payroll> findAll() { return repo.findAll(); }

    public Payroll findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Payroll not found: " + id));
    }

    public Payroll create(Payroll p) { return repo.save(p); }

    public Payroll update(Long id, Payroll p) {
        Payroll exist = findById(id);
        exist.setEmployee(p.getEmployee());
        exist.setJobDepartment(p.getJobDepartment());
        exist.setSalaryBonus(p.getSalaryBonus());
        exist.setLeaveRequest(p.getLeaveRequest());
        exist.setDate(p.getDate());
        exist.setReport(p.getReport());
        exist.setTotalAmount(p.getTotalAmount());
        return repo.save(exist);
    }

    public void delete(Long id) {
        Payroll p = findById(id);
        repo.delete(p);
    }
}
