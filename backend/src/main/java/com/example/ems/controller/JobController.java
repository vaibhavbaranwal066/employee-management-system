package com.example.ems.controller;

import com.example.ems.model.JobDepartment;
import com.example.ems.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService service;
    public JobController(JobService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<JobDepartment>> all() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<JobDepartment> get(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PostMapping
    public ResponseEntity<JobDepartment> create(@RequestBody JobDepartment j) { return ResponseEntity.ok(service.create(j)); }

    @PutMapping("/{id}")
    public ResponseEntity<JobDepartment> update(@PathVariable Long id, @RequestBody JobDepartment j) { return ResponseEntity.ok(service.update(id, j)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
