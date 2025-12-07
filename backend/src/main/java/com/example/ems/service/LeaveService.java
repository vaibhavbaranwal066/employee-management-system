package com.example.ems.service;

import com.example.ems.model.LeaveRequest;
import com.example.ems.model.Payroll;
import com.example.ems.repository.LeaveRepository;
import com.example.ems.repository.PayrollRepository;
import com.example.ems.util.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LeaveService {
    private final LeaveRepository repo;
    private final PayrollRepository payrollRepo;

    public LeaveService(LeaveRepository repo, PayrollRepository payrollRepo) {
        this.repo = repo;
        this.payrollRepo = payrollRepo;
    }

    public List<LeaveRequest> findAll() { return repo.findAll(); }

    public LeaveRequest findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Leave not found: " + id));
    }

    public LeaveRequest create(LeaveRequest l) { return repo.save(l); }

    public LeaveRequest update(Long id, LeaveRequest l) {
        LeaveRequest exist = findById(id);
        exist.setDate(l.getDate());
        exist.setReason(l.getReason());
        exist.setEmployee(l.getEmployee());
        return repo.save(exist);
    }
    public void delete(Long id) {
        // Step 1: detach payroll rows referencing this leave
        List<Payroll> payrolls = payrollRepo.findByLeaveRequest_LeaveId(id);
        for (Payroll p : payrolls) {
            p.setLeaveRequest(null);
            payrollRepo.save(p);
        }

        // Step 2: delete the leave request
        LeaveRequest l = findById(id);
        repo.delete(l);
    }

}
