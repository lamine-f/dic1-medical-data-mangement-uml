package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.AnalysisFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.AnalysisFileRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisFileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IAnalysisFileService implements AnalysisFileService {

    private final AnalysisFileRepository analysisFileRepository;
    private final GetEntity getEntity;
    private final DeleteEntity deleteEntity;

    public IAnalysisFileService(
            AnalysisFileRepository analysisFileRepository,
            GetEntity getEntity,
            DeleteEntity deleteEntity) {
        this.analysisFileRepository = analysisFileRepository;
        this.getEntity = getEntity;
        this.deleteEntity = deleteEntity;
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

    @Override
    public AnalysisFile modify(AnalysisFileDto analysisFileDto, Integer analysisFileId) throws AnalysisFileNotFoundException {
        AnalysisFile analysisFileModifying = this.getEntity.getAnalysisFile(analysisFileId);
        AnalysisFile analysisFileSaving = AnalysisFileDto.toAnalysisFile(analysisFileDto);
        analysisFileSaving.setAnalysis( analysisFileModifying.getAnalysis() );
        analysisFileSaving.setId( analysisFileModifying.getId() );
        return this.analysisFileRepository.save(analysisFileSaving);
    }

    @Override
    public Boolean delete(Integer id) throws AnalysisFileNotFoundException {
        this.deleteEntity.deleteAnalysisFile(id);
        return true;
    }
}
