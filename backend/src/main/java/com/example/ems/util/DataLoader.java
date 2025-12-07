package com.example.ems.util;

import com.example.ems.model.*;
import com.example.ems.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final JobRepository jobRepo;
    private final EmployeeRepository empRepo;
    private final SalaryRepository salaryRepo;
    private final QualificationRepository qualRepo;
    private final LeaveRepository leaveRepo;
    private final PayrollRepository payrollRepo;

    public DataLoader(JobRepository jobRepo, EmployeeRepository empRepo, SalaryRepository salaryRepo,
                      QualificationRepository qualRepo, LeaveRepository leaveRepo, PayrollRepository payrollRepo) {
        this.jobRepo = jobRepo;
        this.empRepo = empRepo;
        this.salaryRepo = salaryRepo;
        this.qualRepo = qualRepo;
        this.leaveRepo = leaveRepo;
        this.payrollRepo = payrollRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // create a job
        JobDepartment dev = new JobDepartment();
        dev.setJobDept("Engineering");
        dev.setName("Software Engineer");
        dev.setDescription("Backend/Fullstack developer");
        dev.setSalaryRange("60000-120000");
        jobRepo.save(dev);

        // salary
        SalaryBonus s = new SalaryBonus();
        s.setJobDepartment(dev);
        s.setAmount(80000.0);
        s.setAnnual(80000.0);
        s.setBonus(5000.0);
        salaryRepo.save(s);

        // employee
        Employee e = new Employee();
        e.setFname("Aman");
        e.setLname("Kumar");
        e.setGender("Male");
        e.setAge(25);
        e.setContactAdd("Mumbai");
        e.setEmpEmail("aman@example.com");
        e.setEmpPass("changeMe");
        e.setJobDepartment(dev);
        empRepo.save(e);

        // qualification
        Qualification q = new Qualification();
        q.setEmployee(e);
        q.setPosition("B.Tech");
        q.setRequirements("CS");
        q.setDateIn("2020-06-01");
        qualRepo.save(q);

        // leave
        LeaveRequest lr = new LeaveRequest();
        lr.setEmployee(e);
        lr.setDate("2025-12-01");
        lr.setReason("Medical");
        leaveRepo.save(lr);

        // payroll
        Payroll p = new Payroll();
        p.setEmployee(e);
        p.setJobDepartment(dev);
        p.setSalaryBonus(s);
        p.setLeaveRequest(lr);
        p.setDate("2025-12-01");
        p.setReport("Monthly salary processed");
        p.setTotalAmount(75000.0);
        payrollRepo.save(p);
    }
}
