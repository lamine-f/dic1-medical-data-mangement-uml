package esp.lord.dic1.uml.persistence.medicalfile.controllers;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.ConsultationSheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheet/analysisFile")
public class AnalysisFileController {

    private ConsultationSheetService consultationSheetService;
    public AnalysisFileController(ConsultationSheetService consultationSheetService) {
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

    @PutMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addConsultationSheet (
            @RequestBody(required = true) ConsultationSheetDto consultationSheetDto,
            @PathVariable(name = "id", required = true) Integer medicalFileId
            ) {
        try {
            ConsultationSheet consultationSheet = this.consultationSheetService.create(consultationSheetDto, medicalFileId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", ConsultationSheetDto.toConsultationSheetModel(consultationSheet)));
        } catch (MedicalFileNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

}
