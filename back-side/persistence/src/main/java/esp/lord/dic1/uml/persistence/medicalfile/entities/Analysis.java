package esp.lord.dic1.uml.persistence.medicalfile.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @ToString
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String description;
    Date date;
    String observation;
    @ManyToOne
    ConsultationSheet consultationSheet;
    @OneToMany(fetch = FetchType.LAZY)
    List<AnalysisFile> analysisFiles;
}
