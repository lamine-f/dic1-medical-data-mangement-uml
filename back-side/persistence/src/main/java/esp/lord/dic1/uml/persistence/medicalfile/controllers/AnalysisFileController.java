package esp.lord.dic1.uml.persistence.medicalfile.controllers;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.AnalysisFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisFileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheets/analysisFiles")
public class AnalysisFileController {
    private final AnalysisFileService analysisFileService;
    public AnalysisFileController(AnalysisFileService analysisFileService) {
        this.analysisFileService = analysisFileService;
    }
    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getAnalysisFile(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.analysisFileService.getAnalysisFiles() ));
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.analysisFileService.getAnalysisFilesOfAnalysis(id)));
        } catch (AnalysisNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> deleteAnalysisFile(
            @PathVariable(required = true, name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.analysisFileService.delete(id)));
        } catch (AnalysisFileNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addAnalysisFile (
            @RequestBody(required = true) AnalysisFileDto analysisFileDto,
            @PathVariable(name = "id", required = true) Integer analysisFileId
            ) {
        try {
            AnalysisFile analysisFile = this.analysisFileService.create(analysisFileDto, analysisFileId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", AnalysisFileDto.toAnalysisFileDto(analysisFile)));
        } catch (AnalysisNotFoundException | MedicalFileNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PatchMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> modifyAnalysisFile (
            @RequestBody(required = true) AnalysisFileDto analysisFileDto,
            @PathVariable(name = "id", required = true) Integer analysisFileId
    ) {
        try {
            AnalysisFile analysisFile = this.analysisFileService.modify(analysisFileDto, analysisFileId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", AnalysisFileDto.toAnalysisFileDto(analysisFile)));
        } catch (AnalysisFileNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }
}
