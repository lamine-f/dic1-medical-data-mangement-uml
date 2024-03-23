package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.AnalysisFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.AnalysisFileRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisFileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IAnalysisFileService implements AnalysisFileService {

    private AnalysisFileRepository analysisFileRepository;
    private GetEntity getEntity;

    public IAnalysisFileService(
            AnalysisFileRepository analysisFileRepository,
            GetEntity getEntity
            ) {
        this.analysisFileRepository = analysisFileRepository;
        this.getEntity = getEntity;
    }

    public List<AnalysisFileDto> AnalysisFilesToDtos(List<AnalysisFile> analysisFiles) {
        return analysisFiles.stream().map(AnalysisFileDto::toAnalysisFileDto).toList();
    }

    @Override
    public List<AnalysisFileDto> getAnalysisFiles() {
        List<AnalysisFile> analysisFiles = this.analysisFileRepository.findAll();
        return this.AnalysisFilesToDtos(analysisFiles);
    }

    @Override
    public List<AnalysisFileDto> getAnalysisFilesOfAnalysis(Integer id) throws AnalysisNotFoundException {
        Analysis analysis = this.getEntity.getAnalysis(id);
        List<AnalysisFile> analysisFiles = this.analysisFileRepository.findByAnalysis(analysis);
        return this.AnalysisFilesToDtos(analysisFiles);
    }

    @Override
    public AnalysisFile create(AnalysisFileDto analysisFileDto, Integer analysisId) throws AnalysisNotFoundException {
        AnalysisFile analysisFileSaving = AnalysisFileDto.toAnalysisFile(analysisFileDto);
        Analysis analysis = this.getEntity.getAnalysis(analysisId);
        analysisFileSaving.setAnalysis( analysis );
        AnalysisFile analysisFileSaved = analysisFileRepository.save(analysisFileSaving);
        return analysisFileSaved;
    }
}
