package esp.lord.dic1.uml.persistence.medicalfile.controllers;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.services.MedicalFileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("medicalFiles")
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
            return ResponseEntity.ok().body(Map.of("message", "en cours", "data", this.medicalFileService.getMedicalFiles() ));
        return ResponseEntity.ok().body(Map.of("message", "en cours", "data", this.medicalFileService.getMedicalFilesOfPatient(id)));
    }

    @PutMapping(value = "", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addMedicalFile (
            @RequestBody(required = true) MedicalFileDto medicalFileDto
            ) {
        MedicalFileDto medicalFileDtoSaved = MedicalFileDto.toMedicalFileDto( this.medicalFileService.createMedicalFile(medicalFileDto));
        return ResponseEntity.ok().body(Map.of("message", "success", "data", medicalFileDtoSaved));
    }

}
