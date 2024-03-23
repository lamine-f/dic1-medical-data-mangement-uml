package esp.lord.dic1.uml.persistence.entities;

import esp.lord.dic1.uml.persistence.enums.Sex;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;


//[TODO] envoyer à Rawane un template
@NoArgsConstructor @AllArgsConstructor @Setter @Getter @ToString
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String lastName;
    String firstName;
    @Enumerated(EnumType.STRING)
    Sex sex;
    Date birthDay;
    String email;
    @OneToMany
    List<MedicalFile> medicalFiles;

}
