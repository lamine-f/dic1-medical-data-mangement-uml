package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.entities.*;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.*;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.*;
import org.springframework.stereotype.Service;

@Service
public class GetEntity {
    private final MedicalFileRepository medicalFileRepository;
    private final ConsultationSheetRepository consultationSheetRepository;
    private final AnalysisRepository analysisRepository;
    private final PreinscriptionRepository preinscriptionRepository;
    private final DrugRepository drugRepository;

    public GetEntity(
            MedicalFileRepository medicalFileRepository,
            ConsultationSheetRepository consultationSheetRepository,
            AnalysisRepository analysisRepository,
            PreinscriptionRepository preinscriptionRepository,
            DrugRepository drugRepository
    ) {
        this.medicalFileRepository = medicalFileRepository;
        this.consultationSheetRepository = consultationSheetRepository;
        this.analysisRepository = analysisRepository;
        this.preinscriptionRepository = preinscriptionRepository;
        this.drugRepository = drugRepository;
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

    public Preinscription getPreinscription (Integer preinscriptionId) throws PreinscriptionNotFoundException {
        Preinscription preinscription = this.preinscriptionRepository.findById(preinscriptionId).orElse(null);
        if ( preinscription == null )
            throw new PreinscriptionNotFoundException("preinscription not found");
        return preinscription;
    }

    public Drug getDrug (Integer drugId) throws DrugNotFoundException {
        Drug drug = this.drugRepository.findById(drugId).orElse(null);
        if ( drug == null )
            throw new DrugNotFoundException("drug not found");
        return drug;
    }


}
