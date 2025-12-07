package com.example.ems.controller;

import com.example.ems.model.SalaryBonus;
import com.example.ems.service.SalaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {
    private final SalaryService service;
    public SalaryController(SalaryService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<SalaryBonus>> all() { return ResponseEntity.ok(service.findAll()); }
    @GetMapping("/{id}")
    public ResponseEntity<SalaryBonus> get(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping
    public ResponseEntity<SalaryBonus> create(@RequestBody SalaryBonus s) { return ResponseEntity.ok(service.create(s)); }
    @PutMapping("/{id}")
    public ResponseEntity<SalaryBonus> update(@PathVariable Long id, @RequestBody SalaryBonus s) { return ResponseEntity.ok(service.update(id, s)); }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
