package esp.lord.dic1.uml.persistence.medicalfile.repositories;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "analyzes")
public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {
    List<Analysis> findByConsultationSheet(ConsultationSheet consultationSheet);
}
