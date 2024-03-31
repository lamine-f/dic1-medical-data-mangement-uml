package esp.lord.dic1.uml.persistence.medicalfile.entities;

import esp.lord.dic1.uml.persistence.entities.Patient;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@NoArgsConstructor @ToString @Setter @Getter
@Entity
public class MedicalFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer fileNumber;
    Date creationDate;
    Date modificationDate;
    @OneToMany (fetch = FetchType.EAGER)
    List<ConsultationSheet> consultationSheets;
    @ManyToOne
    Patient patient;
}
