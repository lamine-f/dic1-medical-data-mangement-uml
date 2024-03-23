package esp.lord.dic1.uml.persistence.medicalfile.controllers;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.MedicalFileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("medicalFiles")
@CrossOrigin(value = "*")
public class MedicalFileController {
    private MedicalFileService medicalFileService;
    public MedicalFileController(MedicalFileService medicalFileService) {
        this.medicalFileService = medicalFileService;
    }

    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getAllMedicalFiles(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.medicalFileService.getMedicalFiles() ));
        return ResponseEntity.ok().body(Map.of("message", "success", "data", this.medicalFileService.getMedicalFilesOfPatient(id)));
    }

    @DeleteMapping( value = "{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> deleteMedicalFile(
            @PathVariable(required = true, name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.medicalFileService.delete(id)));
        } catch (MedicalFileNotFoundException | ConsultationSheetNotFoundException | AnalysisNotFoundException |
                 PreinscriptionNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value = "", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addMedicalFile (
            @RequestBody(required = true) MedicalFileDto medicalFileDto
            ) {
        MedicalFileDto medicalFileDtoSaved = MedicalFileDto.toMedicalFileDto( this.medicalFileService.create(medicalFileDto));
        return ResponseEntity.ok().body(Map.of("message", "success", "data", medicalFileDtoSaved));
    }

    @PatchMapping(value = "{medicalFileId}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> modifyMedicalFile (
            @RequestBody(required = true) MedicalFileDto medicalFileDto,
            @PathVariable(required = true, name = "medicalFileId") Integer medicalFileId

    ) {
        MedicalFileDto medicalFileDtoSaved = null;
        try {
            medicalFileDtoSaved = MedicalFileDto.toMedicalFileDto( this.medicalFileService.modify(medicalFileDto, medicalFileId));
            return ResponseEntity.ok().body(Map.of("message", "success", "data", medicalFileDtoSaved));
        } catch (MedicalFileNotFoundException | ConsultationSheetNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }
}
