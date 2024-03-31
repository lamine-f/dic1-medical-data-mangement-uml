package esp.lord.dic1.uml.persistence.medicalfile.repositories;

import esp.lord.dic1.uml.persistence.entities.Patient;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource
public interface MedicalFileRepository extends JpaRepository<MedicalFile, Integer> {
    public List<MedicalFile> findAllByPatient (Patient patient);
}
