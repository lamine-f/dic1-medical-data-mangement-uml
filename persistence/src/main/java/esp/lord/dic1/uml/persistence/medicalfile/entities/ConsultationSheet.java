package esp.lord.dic1.uml.persistence.medicalfile.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor @ToString @Setter @Getter
@Entity
public class ConsultationSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer sheetNumber;
    Date creationDate;
    Date modificationDate;
    String notes;
    @ManyToOne
    MedicalFile medicalFile;
    @OneToMany(fetch = FetchType.LAZY)
    List<Analysis> analyzes;
}
