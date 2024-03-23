package esp.lord.dic1.uml.persistence.medicalfile.controllers;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.ConsultationSheetService;
import esp.lord.dic1.uml.persistence.medicalfile.services.MedicalFileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheets")
public class ConsultationSheetController {

    private final ConsultationSheetService consultationSheetService;
    public ConsultationSheetController(ConsultationSheetService consultationSheetService) {
        this.consultationSheetService = consultationSheetService;
    }
    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getConsultationSheets(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.consultationSheetService.getConsultationSheets() ));
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.consultationSheetService.getConsultationSheetsOfMedicalFile(id)));
        } catch (MedicalFileNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping( value =  "{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> deleteConsultationSheets(
            @PathVariable(required = true, name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.consultationSheetService.delete(id)));
        } catch (PreinscriptionNotFoundException | ConsultationSheetNotFoundException | AnalysisNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addConsultationSheet (
            @RequestBody(required = true) ConsultationSheetDto consultationSheetDto,
            @PathVariable(name = "id", required = true) Integer medicalFileId
            ) {
        try {
            ConsultationSheet consultationSheet = this.consultationSheetService.create(consultationSheetDto, medicalFileId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", ConsultationSheetDto.toConsultationSheetModel(consultationSheet) ));
        } catch (MedicalFileNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PatchMapping(value ="{consultationSheetId}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> modifyConsultationSheet (
            @RequestBody(required = true) ConsultationSheetDto consultationSheetDto,
            @PathVariable(name = "consultationSheetId", required = true) Integer consultationSheetId
    ) {
        ConsultationSheet consultationSheet = null;
        try {
            consultationSheet = this.consultationSheetService.modify(consultationSheetDto, consultationSheetId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", ConsultationSheetDto.toConsultationSheetModel(consultationSheet) ));

        } catch (ConsultationSheetNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

}
