package esp.lord.dic1.uml.persistence.medicalfile.repositories;

import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface DrugRepository extends JpaRepository<Drug, Integer> {
    List<Drug> findByPreinscriptionsContains (Preinscription preinscription);
}
