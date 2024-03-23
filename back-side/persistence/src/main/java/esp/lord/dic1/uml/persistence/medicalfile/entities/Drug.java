package esp.lord.dic1.uml.persistence.medicalfile.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@NoArgsConstructor @Getter @Setter @ToString
@Entity
public class Drug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String designation ;
    Date dateAcquisition;
    Date dateExpiry;
    @ManyToMany
    List<Preinscription> preinscriptions;
}
