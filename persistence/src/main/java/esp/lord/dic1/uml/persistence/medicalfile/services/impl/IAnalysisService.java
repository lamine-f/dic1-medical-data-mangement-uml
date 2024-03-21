package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.AnalysisRepository;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.ConsultationSheetRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.AnalysisService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IAnalysisService implements AnalysisService {

    private AnalysisRepository analysisRepository;
    private ConsultationSheetRepository consultationSheetRepository;

    public IAnalysisService(
            AnalysisRepository analysisRepository,
            ConsultationSheetRepository consultationSheetRepository
            ) {
        this.analysisRepository = analysisRepository;
        this.consultationSheetRepository = consultationSheetRepository;
    }

    public List<AnalysisDto> analysisToModels(List<Analysis> analysiss) {
        return analysiss.stream().map(AnalysisDto::toAnalysisDto).toList();
    }

    public ConsultationSheet getConsultationSheet (Integer consultationSheetId) throws ConsultationSheetNotFoundException {
        ConsultationSheet consultationSheet = this.consultationSheetRepository.findById(consultationSheetId).orElse(null);
        if ( consultationSheet == null )
            throw new ConsultationSheetNotFoundException("consultation sheet file not found");
        return consultationSheet;
    }

    @Override
    public List<AnalysisDto> getAnalysis() {
        List<Analysis> analyses = this.analysisRepository.findAll();
        return this.analysisToModels(analyses);
    }

    @Override
    public List<AnalysisDto> getAnalysisOfConsultationSheet(Integer id) throws ConsultationSheetNotFoundException {
        ConsultationSheet consultationSheet = this.getConsultationSheet(id);
        List<Analysis> analysis = this.analysisRepository.findByConsultationSheet(consultationSheet);
        return this.analysisToModels(analysis);
    }

    @Override
    public Analysis create(AnalysisDto analysisDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException {
        Analysis analysisSaving = AnalysisDto.toAnalysis(analysisDto);
        analysisSaving.setAnalysisFiles(new ArrayList<>());
        ConsultationSheet consultationSheet = this.getConsultationSheet(consultationSheetId);
        analysisSaving.setConsultationSheet( consultationSheet );
        Analysis analysisSaved = analysisRepository.save(analysisSaving);
        return analysisSaved;
    }
}
