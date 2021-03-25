package com.example.restservice.models.test;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tests")
public class Test {
    @Id
    private String id;

    private String testName;
    private String description;
    private String sampleName;
    private Double unitPrice;

    public Test(String testName, String description, String sampleName, Double unitPrice) {
        this.testName = testName;
        this.description = description;
        this.sampleName = sampleName;
        this.unitPrice = unitPrice;
    }
    public Test(){

    }

    public String getId() {
        return id;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSampleName() {
        return sampleName;
    }

    public void setSampleName(String sampleName) {
        this.sampleName = sampleName;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    @Override
    public String toString() {
        return "Test{" +
                "testName='" + testName + '\'' +
                ", description='" + description + '\'' +
                ", sampleName='" + sampleName + '\'' +
                ", unitPrice=" + unitPrice +
                '}';
    }
}
