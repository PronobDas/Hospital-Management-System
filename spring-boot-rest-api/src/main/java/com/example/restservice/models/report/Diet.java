package com.example.restservice.models.report;

class Diet {
    private String dietname;
    private String description;

    public Diet(String dietname, String description) {
        this.dietname = dietname;
        this.description = description;
    }

    public Diet() {

    }

    public String getDietname() {
        return dietname;
    }

    public void setDietname(String dietname) {
        this.dietname = dietname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Diet{" +
                "dietname='" + dietname + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}