package esp.lord.dic1.uml.persistence.medicalfile.dtos;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor @Getter @Setter @ToString @AllArgsConstructor
public class DrugDto implements Serializable {
    Integer id;
    String designation ;
    Date dateAcquisition;
    Date dateExpiry;

    public static DrugDto toDrugDto (Drug drug) {
        DrugDto drugDto = new DrugDto();
        drugDto.setDesignation( drug.getDesignation() );
        drugDto.setDateExpiry( drug.getDateExpiry() );
        drugDto.setDateAcquisition( drug.getDateAcquisition() );
        drugDto.setId( drug.getId() );
        return drugDto;
    }

    public static Drug toDrug (DrugDto drugDto) {
        Drug drug = new Drug();
        drug.setDesignation( drugDto.getDesignation() );
        drug.setDateAcquisition( drugDto.getDateAcquisition() );
        drug.setDateExpiry( drugDto.getDateExpiry() );
        return drug;
    }
}

