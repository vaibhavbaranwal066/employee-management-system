package com.example.ems.service;

import com.example.ems.model.Employee;
import com.example.ems.model.Payroll;
import com.example.ems.repository.EmployeeRepository;
import com.example.ems.repository.PayrollRepository;
import com.example.ems.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepository repo;
    private final PayrollRepository payrollRepo;
    @Autowired

    public EmployeeService(EmployeeRepository repo, PayrollRepository payrollRepo) {
        this.repo = repo;
        this.payrollRepo = payrollRepo;
    }

    public List<Employee> findAll() { return repo.findAll(); }

    public Employee findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + id));
    }

    public Employee create(Employee e) {
        return repo.save(e);
    }

    public Employee update(Long id, Employee newE) {
        Employee e = findById(id);
        e.setFname(newE.getFname());
        e.setLname(newE.getLname());
        e.setAge(newE.getAge());
        e.setGender(newE.getGender());
        e.setContactAdd(newE.getContactAdd());
        e.setEmpEmail(newE.getEmpEmail());
        e.setEmpPass(newE.getEmpPass());
        e.setJobDepartment(newE.getJobDepartment());
        return repo.save(e);
    }
    public void delete(Long id) {
        // Step 1: detach payroll rows referencing this employee
        List<Payroll> payrolls = payrollRepo.findByEmployee_EmpId(id);
        for (Payroll p : payrolls) {
            p.setEmployee(null);
            payrollRepo.save(p);
        }

        // Step 2: delete the employee
        Employee e = findById(id);
        repo.delete(e);
    }

}
