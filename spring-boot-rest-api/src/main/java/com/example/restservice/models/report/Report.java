package com.example.restservice.models.report;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "reports")
public class Report {
    @Id
    private String id;
    private String patientid;
    private String doctorid;
    @CreatedDate
    private Date createddate;
    private Double bloodpressure;
    private Double pulserate;
    private Double weight;
    private List<String> allergies;
    private List<String> disabilities;
    private List<Medicine> medicines;
    private List<Diet> diets;
    private String patienthistory;
    private String followupdoctorid;

    public Report(String patientid, String doctorid, Double bloodpressure, Double pulserate,
                  Double weight, List<String> allergies, List<String> disabilities,
                  List<Medicine> medicines, List<Diet> diets, String patienthistory, String followupdoctorid) {
        this.patientid = patientid;
        this.doctorid = doctorid;
        this.bloodpressure = bloodpressure;
        this.pulserate = pulserate;
        this.weight = weight;
        this.allergies = allergies;
        this.disabilities = disabilities;
        this.medicines = medicines;
        this.diets = diets;
        this.patienthistory = patienthistory;
        this.followupdoctorid = followupdoctorid;
    }

    public Report() {

    }

    public String getId() {
        return id;
    }

    public String getPatientid() {
        return patientid;
    }

    public void setPatientid(String patientid) {
        this.patientid = patientid;
    }

    public String getDoctorid() {
        return doctorid;
    }

    public void setDoctorid(String doctorid) {
        this.doctorid = doctorid;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public Double getBloodpressure() {
        return bloodpressure;
    }

    public void setBloodpressure(Double bloodpressure) {
        this.bloodpressure = bloodpressure;
    }

    public Double getPulserate() {
        return pulserate;
    }

    public void setPulserate(Double pulserate) {
        this.pulserate = pulserate;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }

    public List<String> getDisabilities() {
        return disabilities;
    }

    public void setDisabilities(List<String> disabilities) {
        this.disabilities = disabilities;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }

    public List<Diet> getDiets() {
        return diets;
    }

    public void setDiets(List<Diet> diets) {
        this.diets = diets;
    }

    public String getPatienthistory() {
        return patienthistory;
    }

    public void setPatienthistory(String patienthistory) {
        this.patienthistory = patienthistory;
    }

    public String getFollowupdoctorid() {
        return followupdoctorid;
    }

    public void setFollowupdoctorid(String followupdoctorid) {
        this.followupdoctorid = followupdoctorid;
    }
}

