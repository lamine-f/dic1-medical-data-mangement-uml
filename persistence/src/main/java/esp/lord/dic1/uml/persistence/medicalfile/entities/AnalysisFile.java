package esp.lord.dic1.uml.persistence.medicalfile.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString @NoArgsConstructor
@Entity
public class AnalysisFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String title;
    String fileUrl;
    String specifics;

    @ManyToOne
    Analysis analysis;
}
