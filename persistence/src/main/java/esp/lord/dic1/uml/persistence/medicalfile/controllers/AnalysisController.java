package esp.lord.dic1.uml.persistence.medicalfile.controllers;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisService;
import esp.lord.dic1.uml.persistence.medicalfile.services.ConsultationSheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheet/analysis")
public class AnalysisController {

    private AnalysisService analysisService;
    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }
    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getAnalyses(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.analysisService.getAnalysis()));
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.analysisService.getAnalysisOfConsultationSheet(id)));
        } catch (ConsultationSheetNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addConsultationSheet (
            @RequestBody(required = true) AnalysisDto analysisDto,
            @PathVariable(name = "id", required = true) Integer consultationSheetId
            ) {
        try {
            Analysis analysis = this.analysisService.create(analysisDto, consultationSheetId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", AnalysisDto.toAnalysisDto(analysis)));
        } catch (ConsultationSheetNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

}
