package com.example.restservice.controllers.report;

import com.example.restservice.models.report.Medicine;
import com.example.restservice.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MedicineController {

    @Autowired
    MedicineRepository medicineRepository;

    @GetMapping("/medicines")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        try {
            List<Medicine> medicines = new ArrayList<Medicine>();
            medicineRepository.findAll().forEach(medicines::add);

            if (medicines.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(medicines, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/medicines/{id}")
    public ResponseEntity<Medicine> getMedicine(@PathVariable("id") String id) {
        Optional<Medicine> medicineData = medicineRepository.findById(id);
        if (medicineData.isPresent()) {
            return new ResponseEntity<>(medicineData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/medicines")
    public ResponseEntity<Medicine> createMedicine(@RequestBody Medicine medicine) {
        try {
            Medicine _medicine = medicineRepository.save(new Medicine(
                    medicine.getDrugname(),
                    medicine.getUnit(),
                    medicine.getDosage()
            ));
            return new ResponseEntity<>(_medicine, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/medicines/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable("id") String id, @RequestBody Medicine medicine) {
        Optional<Medicine> medicineData = medicineRepository.findById(id);
        if (medicineData.isPresent()) {
            Medicine _medicine = medicineData.get();
            _medicine.setDrugname(medicine.getDrugname());
            _medicine.setDosage(medicine.getDosage());
            _medicine.setUnit(medicine.getUnit());
            return new ResponseEntity<>(medicineRepository.save(_medicine), HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/medicines/{id}")
    public ResponseEntity<HttpStatus> deleteMedicine(@PathVariable("id") String id) {
        try {
            medicineRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
