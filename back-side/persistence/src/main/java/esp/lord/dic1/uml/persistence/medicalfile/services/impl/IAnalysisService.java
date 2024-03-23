package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.AnalysisRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IAnalysisService implements AnalysisService {

    private final AnalysisRepository analysisRepository;
    private final GetEntity getEntity;
    private final DeleteEntity deleteEntity;
    public IAnalysisService(
            AnalysisRepository analysisRepository,
            GetEntity getEntity,
            DeleteEntity deleteEntity) {
        this.analysisRepository = analysisRepository;
        this.getEntity = getEntity;
        this.deleteEntity = deleteEntity;
    }

    public List<AnalysisDto> analysisToModels(List<Analysis> analysiss) {
        return analysiss.stream().map(AnalysisDto::toAnalysisDto).toList();
    }

    @Override
    public List<AnalysisDto> getAnalysis() {
        List<Analysis> analyses = this.analysisRepository.findAll();
        return this.analysisToModels(analyses);
    }

    @Override
    public List<AnalysisDto> getAnalysisOfConsultationSheet(Integer id) throws ConsultationSheetNotFoundException {
        ConsultationSheet consultationSheet = this.getEntity.getConsultationSheet(id);
        List<Analysis> analysis = this.analysisRepository.findByConsultationSheet(consultationSheet);
        return this.analysisToModels(analysis);
    }

    @Override
    public Analysis create(AnalysisDto analysisDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException {
        Analysis analysisSaving = AnalysisDto.toAnalysis(analysisDto);
        analysisSaving.setAnalysisFiles(new ArrayList<>());
        ConsultationSheet consultationSheet = this.getEntity.getConsultationSheet(consultationSheetId);
        analysisSaving.setConsultationSheet( consultationSheet );
        Analysis analysisSaved = analysisRepository.save(analysisSaving);
        return analysisSaved;
    }

    @Override
    public Analysis modify(AnalysisDto analysisDto, Integer id) throws AnalysisNotFoundException {
        Analysis analysisModifying = this.getEntity.getAnalysis(id);
        Analysis analysisSaving = AnalysisDto.toAnalysis(analysisDto);
        analysisSaving.setId( analysisModifying.getId() );
        analysisSaving.setConsultationSheet( analysisModifying.getConsultationSheet() );
        return this.analysisRepository.save(analysisSaving);
    }

    @Override
    public Boolean delete(Integer id) throws AnalysisNotFoundException {
        this.deleteEntity.deleteAnalysis(id);
        return true;
    }
}
