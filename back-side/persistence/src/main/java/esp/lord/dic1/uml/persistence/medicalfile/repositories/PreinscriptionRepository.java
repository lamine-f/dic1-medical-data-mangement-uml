package esp.lord.dic1.uml.persistence.medicalfile.repositories;

import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PreinscriptionRepository extends JpaRepository<Preinscription, Integer> {
    List<Preinscription> findByConsultationSheet (ConsultationSheet consultationSheet);
}
