package esp.lord.dic1.uml.persistence.medicalfile.repositories;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.AnalysisFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "analysisfiles")
public interface AnalysisFileRepository extends JpaRepository<AnalysisFile, Integer> {

    public List<AnalysisFile> findByAnalysis(Analysis analysis);
}
