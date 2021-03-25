package com.example.restservice.repository;

import com.example.restservice.models.invoice.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    Optional<Invoice> findByPatientId(String patientId);
}
