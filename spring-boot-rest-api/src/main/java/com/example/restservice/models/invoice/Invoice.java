package com.example.restservice.models.invoice;

import com.example.restservice.models.test.Test;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.xml.crypto.Data;
import java.util.List;

@Document(collection = "invoices")
public class Invoice {
    @Id
    private String id;

    private String patientId;
    private String doctorId;
    @CreatedDate
    private Data createdDate;
    private List<Test> tests;

    public Invoice(String patientId, String doctorId, List<Test> tests) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.tests = tests;
    }

    public Invoice(){}

    public String getId() {
        return id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public Data getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Data createdDate) {
        this.createdDate = createdDate;
    }

    public List<Test> getTests() {
        return tests;
    }

    public void setTests(List<Test> tests) {
        this.tests = tests;
    }
}
