package com.example.ems.service;

import com.example.ems.model.JobDepartment;
import com.example.ems.repository.JobRepository;
import com.example.ems.util.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JobService {
    private final JobRepository repo;
    public JobService(JobRepository repo) { this.repo = repo; }

    public List<JobDepartment> findAll() { return repo.findAll(); }

    public JobDepartment findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found: " + id));
    }

    public JobDepartment create(JobDepartment j) { return repo.save(j); }

    public JobDepartment update(Long id, JobDepartment j) {
        JobDepartment exist = findById(id);
        exist.setJobDept(j.getJobDept());
        exist.setName(j.getName());
        exist.setDescription(j.getDescription());
        exist.setSalaryRange(j.getSalaryRange());
        return repo.save(exist);
    }

    public void delete(Long id) {
        JobDepartment j = findById(id);
        repo.delete(j);
    }
}
