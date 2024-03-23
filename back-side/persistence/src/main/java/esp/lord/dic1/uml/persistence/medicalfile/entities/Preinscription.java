package esp.lord.dic1.uml.persistence.medicalfile.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor @Getter @Setter @ToString
@Entity
public class Preinscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String indication;
    String period;
    @ManyToOne
    ConsultationSheet consultationSheet;
    @ManyToMany
    List<Drug> drugs;
}
