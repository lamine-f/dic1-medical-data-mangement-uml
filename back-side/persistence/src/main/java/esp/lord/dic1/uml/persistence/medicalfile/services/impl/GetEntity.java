package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.AnalysisRepository;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.ConsultationSheetRepository;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.MedicalFileRepository;
import org.springframework.stereotype.Service;

@Service
public class GetEntity {
    private MedicalFileRepository medicalFileRepository;
    private ConsultationSheetRepository consultationSheetRepository;
    private AnalysisRepository analysisRepository;

    public GetEntity(
            MedicalFileRepository medicalFileRepository,
            ConsultationSheetRepository consultationSheetRepository,
            AnalysisRepository analysisRepository
    ) {
        this.medicalFileRepository = medicalFileRepository;
        this.consultationSheetRepository = consultationSheetRepository;
        this.analysisRepository = analysisRepository;
    }

    public MedicalFile getMedicalFile (Integer medicalFileId) throws MedicalFileNotFoundException {
        MedicalFile medicalFile = this.medicalFileRepository.findById(medicalFileId).orElse(null);
        if ( medicalFile == null )
            throw new MedicalFileNotFoundException("medical file not found");
        return medicalFile;
    }

    public ConsultationSheet getConsultationSheet (Integer consultationSheetId) throws ConsultationSheetNotFoundException {
        ConsultationSheet consultationSheet = this.consultationSheetRepository.findById(consultationSheetId).orElse(null);
        if ( consultationSheet == null )
            throw new ConsultationSheetNotFoundException("consultation sheet file not found");
        return consultationSheet;
    }

    public Analysis getAnalysis (Integer AnalysisId) throws AnalysisNotFoundException {
        Analysis analysis = this.analysisRepository.findById(AnalysisId).orElse(null);
        if ( analysis == null )
            throw new AnalysisNotFoundException("analysis not found");
        return analysis;
    }
}
