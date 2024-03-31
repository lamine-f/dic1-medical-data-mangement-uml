package esp.lord.dic1.uml.persistence.repositories;

import esp.lord.dic1.uml.persistence.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
