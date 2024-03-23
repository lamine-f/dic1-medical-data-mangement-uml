package esp.lord.dic1.uml.persistence.medicalfile.dtos;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class PreinscriptionDto implements Serializable {
    Integer id;
    String indication;
    String period;

    public static PreinscriptionDto toPreinscriptionDto (Preinscription preinscription) {
        PreinscriptionDto preinscriptionDto = new PreinscriptionDto();
        preinscriptionDto.setIndication( preinscription.getIndication() );
        preinscriptionDto.setPeriod( preinscription.getPeriod() );
        preinscriptionDto.setId ( preinscription.getId() );
        return preinscriptionDto;
    }

    public static Preinscription toPreinscription (PreinscriptionDto preinscriptionDto) {
        Preinscription preinscription = new Preinscription();
        preinscription.setIndication( preinscriptionDto.getIndication() );
        preinscription.setPeriod( preinscriptionDto.getPeriod() );
        return preinscription;
    }

}
