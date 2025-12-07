package com.example.ems.repository;

import com.example.ems.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    List<Payroll> findByEmployee_EmpId(Long empId);
    List<Payroll> findBySalaryBonus_SalaryId(Long salaryId);
    List<Payroll> findByLeaveRequest_LeaveId(Long leaveId);
    List<Payroll> findByJobDepartment_JobId(Long jobId);

}
