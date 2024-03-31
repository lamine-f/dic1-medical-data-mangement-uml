package esp.lord.dic1.uml.persistence.medicalfile.controllers;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.DrugDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.DrugNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.services.DrugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("medicalFiles/consultationSheets/drugs")
@CrossOrigin(value = "*")
public class DrugController {
    private final DrugService drugService;
    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }
    @GetMapping( value = {"", "{id}"}, produces = "application/json")
    public ResponseEntity<Map<String, Object>> getDrug(
            @PathVariable(required = false, name = "id") Integer id
    ) {
        if ( id == null )
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.drugService.getDrugs() ));
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.drugService.getDrugsOfPreinscription(id)));
        } catch (PreinscriptionNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping(value = "" , produces = "application/json")
    public ResponseEntity<Map<String, Object>> addDrug (
            @RequestBody( required = true) DrugDto drugDto
    ) {
        Drug drug = this.drugService.create(drugDto);
        return ResponseEntity.ok().body(Map.of("message", "success", "data", DrugDto.toDrugDto(drug)));
    }

    @PatchMapping(value = "{drugId}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> modifyDrug (
            @PathVariable(name = "drugId", required = true) Integer drugId,
            @RequestBody(required = true) DrugDto drugDto
    ) {
        try {
            Drug drug = this.drugService.modify(drugDto, drugId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", DrugDto.toDrugDto(drug)));
        } catch (DrugNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping( value = "{id}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> deleteDrug(
            @PathVariable(required = true, name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.drugService.delete(id)));
        } catch (DrugNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }


    @PatchMapping(value = "{drugId}/{preinscriptionId}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> addDrugToPreinscription (
            @PathVariable(name = "drugId", required = true) Integer drugId,
            @PathVariable(name = "preinscriptionId", required = true) Integer preinscriptionId
            ) {
        try {
            Drug drug = this.drugService.add(drugId, preinscriptionId);
            return ResponseEntity.ok().body(Map.of("message", "success", "data", DrugDto.toDrugDto(drug)));
        } catch (DrugNotFoundException | PreinscriptionNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping( value = "{drugId}/{preinscriptionId}", produces = "application/json")
    public ResponseEntity<Map<String, Object>> deleteDrugOfPreinscription(
            @PathVariable(required = true, name = "drugId") Integer drugId,
            @PathVariable(required = true, name = "preinscriptionId") Integer preinscriptionId
    ) {
        try {
            return ResponseEntity.ok().body(Map.of("message", "success", "data", this.drugService.deletePreinscription(drugId, preinscriptionId)));
        } catch (PreinscriptionNotFoundException | DrugNotFoundException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

}
