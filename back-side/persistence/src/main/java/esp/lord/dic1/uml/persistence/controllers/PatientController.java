package esp.lord.dic1.uml.persistence.controllers;

import esp.lord.dic1.uml.persistence.dtos.PatientDto;
import esp.lord.dic1.uml.persistence.entities.Patient;
import esp.lord.dic1.uml.persistence.exceptions.PatientNotFoundException;
import esp.lord.dic1.uml.persistence.services.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("patients")
@CrossOrigin("*")
public class PatientController {
    private final PatientService patientService;
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }
    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getPatient(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.patientService.getPatients() ));
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.patientService.getPatientById(id)));
        } catch (PatientNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value = "" , produces = "application/json")
    public ResponseEntity<Map<String, Object>> addPatient (
            @RequestBody( required = true) PatientDto patientDto
    ) {
        Patient patient = this.patientService.create(patientDto);
        return ResponseEntity.ok().body(Map.of("message", "success", "data", PatientDto.toPatientDto(patient)));
    }

    @PatchMapping(value = "{patientId}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> modifyPatient (
            @PathVariable(name = "patientId", required = true) Integer patientId,
            @RequestBody(required = true) PatientDto patientDto
    ) {
        try {
            Patient patient = this.patientService.modify(patientDto, patientId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", PatientDto.toPatientDto(patient)));
        } catch (PatientNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping( value = "{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> deletePatient(
            @PathVariable(required = true, name = "id") Integer id
    ) {
        return ResponseEntity.ok().body(Map.of("message", "success", "data", this.patientService.delete(id)));
    }

}
