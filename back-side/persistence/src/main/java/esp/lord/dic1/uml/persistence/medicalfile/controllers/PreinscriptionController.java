package esp.lord.dic1.uml.persistence.medicalfile.controllers;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.PreinscriptionDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.PreinscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheet/preinscription")
public class PreinscriptionController {
    private PreinscriptionService preinscriptionService;
    public PreinscriptionController(PreinscriptionService preinscriptionService) {
        this.preinscriptionService = preinscriptionService;
    }
    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getPreinscription(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.preinscriptionService.getPreinscription() ));
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.preinscriptionService.getPreinscriptionOfConsultationSheet(id)));
        } catch (ConsultationSheetNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value ="{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addPreinscription (
            @RequestBody(required = true) PreinscriptionDto preinscriptionDto,
            @PathVariable(name = "id", required = true) Integer consultionSheetId
            ) {
        try {
            Preinscription preinscription = this.preinscriptionService.create(preinscriptionDto, consultionSheetId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", PreinscriptionDto.toPreinscriptionDto(preinscription)));
        } catch (ConsultationSheetNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }
}
