package com.example.ems.controller;

import com.example.ems.model.Qualification;
import com.example.ems.service.QualificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qualifications")
public class QualificationController {
    private final QualificationService service;
    public QualificationController(QualificationService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Qualification>> all() { return ResponseEntity.ok(service.findAll()); }
    @GetMapping("/{id}")
    public ResponseEntity<Qualification> get(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping
    public ResponseEntity<Qualification> create(@RequestBody Qualification q) { return ResponseEntity.ok(service.create(q)); }
    @PutMapping("/{id}")
    public ResponseEntity<Qualification> update(@PathVariable Long id, @RequestBody Qualification q) { return ResponseEntity.ok(service.update(id, q)); }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
