package esp.lord.dic1.uml.persistence.medicalfile.controllers;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheets/analyses")
@CrossOrigin(value = "*")
public class AnalysisController {

    private final AnalysisService analysisService;
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

    @DeleteMapping( value = "{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> deleteAnalyses(
            @PathVariable(required = true, name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.analysisService.delete(id)));
        } catch (AnalysisNotFoundException e) {
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

    @PatchMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> modifyConsultationSheet (
            @RequestBody(required = true) AnalysisDto analysisDto,
            @PathVariable(name = "id", required = true) Integer id
    ) {
        Analysis analysis = null;
        try {
            analysis = this.analysisService.modify(analysisDto, id);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", AnalysisDto.toAnalysisDto(analysis)));
        } catch (AnalysisNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

}
