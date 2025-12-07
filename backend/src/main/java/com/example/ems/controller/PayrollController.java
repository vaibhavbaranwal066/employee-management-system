package com.example.ems.controller;

import com.example.ems.model.Payroll;
import com.example.ems.service.PayrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payrolls")
public class PayrollController {
    private final PayrollService service;
    public PayrollController(PayrollService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Payroll>> all() { return ResponseEntity.ok(service.findAll()); }
    @GetMapping("/{id}")
    public ResponseEntity<Payroll> get(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping
    public ResponseEntity<Payroll> create(@RequestBody Payroll p) { return ResponseEntity.ok(service.create(p)); }
    @PutMapping("/{id}")
    public ResponseEntity<Payroll> update(@PathVariable Long id, @RequestBody Payroll p) { return ResponseEntity.ok(service.update(id, p)); }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
