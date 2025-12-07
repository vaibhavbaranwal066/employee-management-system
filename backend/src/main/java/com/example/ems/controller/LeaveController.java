package com.example.ems.controller;

import com.example.ems.model.LeaveRequest;
import com.example.ems.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {
    private final LeaveService service;
    public LeaveController(LeaveService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> all() { return ResponseEntity.ok(service.findAll()); }
    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> get(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping
    public ResponseEntity<LeaveRequest> create(@RequestBody LeaveRequest l) { return ResponseEntity.ok(service.create(l)); }
    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequest> update(@PathVariable Long id, @RequestBody LeaveRequest l) { return ResponseEntity.ok(service.update(id, l)); }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
