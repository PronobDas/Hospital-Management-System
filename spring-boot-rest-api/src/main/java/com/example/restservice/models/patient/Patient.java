package com.example.restservice.models.patient;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Document(collection = "patients")
public class Patient {
    @Id
    private String id;
    private String name;
    @CreatedDate
    private Date entrydate;
    private Date dob;
    private Long age;
    private String gender;
    private String occupation;
    private Integer healthinsuranceno;
    private String healthcareprovider;
    private String patientaddress;
    private Integer contact;
    private String doctorid;

    public Patient() {

    }

    public Patient(String name, Date dob, String gender, String occupation, Integer healthinsuranceno,
                   String healthcareprovider, String patientaddress, Integer contact, String doctorid) {
        this.name = name;
        this.dob = dob;
        this.age = calculateAge(convertToLocalDateViaInstant(dob));
        this.gender = gender;
        this.occupation = occupation;
        this.healthinsuranceno = healthinsuranceno;
        this.healthcareprovider = healthcareprovider;
        this.patientaddress = patientaddress;
        this.contact = contact;
        this.doctorid = doctorid;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getEntrydate() { return entrydate; }

    public Date getDob() { return dob; }

    public void setDob(Date dob) { this.dob = dob;}

    public Long getAge() { return age; }

    public void setAge(Long age) { this.age = age; }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public Integer getHealthinsuranceno() {
        return healthinsuranceno;
    }

    public void setHealthinsuranceno(Integer healthinsuranceno) {
        this.healthinsuranceno = healthinsuranceno;
    }

    public String getHealthcareprovider() {
        return healthcareprovider;
    }

    public void setHealthcareprovider(String healthcareprovider) {
        this.healthcareprovider = healthcareprovider;
    }

    public String getPatientaddress() {
        return patientaddress;
    }

    public void setPatientaddress(String patientaddress) { this.patientaddress = patientaddress; }

    public Integer getContact() {
        return contact;
    }

    public void setContact(Integer contact) {
        this.contact = contact;
    }

    public String getDoctorid() {
        return doctorid;
    }

    public void setDoctorid(String doctorid) {
        this.doctorid = doctorid;
    }

    public LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public long calculateAge(LocalDate dob){
        return ChronoUnit.YEARS.between(dob,LocalDate.now());
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", entrydate=" + entrydate +
                ", dob=" + dob +
                ", age=" + age +
                ", Gender='" + gender + '\'' +
                ", occupation='" + occupation + '\'' +
                ", healthinsuranceno=" + healthinsuranceno +
                ", healthcareprovider='" + healthcareprovider + '\'' +
                ", patientaddress='" + patientaddress + '\'' +
                ", contact=" + contact +
                ", doctorid='" + doctorid + '\'' +
                '}';
    }
}
