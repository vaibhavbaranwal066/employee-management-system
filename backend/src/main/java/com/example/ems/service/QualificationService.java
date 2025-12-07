package com.example.ems.service;

import com.example.ems.model.Qualification;
import com.example.ems.repository.QualificationRepository;
import com.example.ems.util.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class QualificationService {
    private final QualificationRepository repo;
    public QualificationService(QualificationRepository repo) { this.repo = repo; }

    public List<Qualification> findAll() { return repo.findAll(); }

    public Qualification findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Qualification not found: " + id));
    }

    public Qualification create(Qualification q) { return repo.save(q); }

    public Qualification update(Long id, Qualification q) {
        Qualification exist = findById(id);
        exist.setPosition(q.getPosition());
        exist.setRequirements(q.getRequirements());
        exist.setDateIn(q.getDateIn());
        exist.setEmployee(q.getEmployee());
        return repo.save(exist);
    }

    public void delete(Long id) {
        Qualification q = findById(id);
        repo.delete(q);
    }
}
