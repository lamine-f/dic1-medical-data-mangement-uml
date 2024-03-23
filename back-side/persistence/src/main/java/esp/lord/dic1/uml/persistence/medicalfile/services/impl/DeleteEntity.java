package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.entities.*;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.*;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeleteEntity {
    private final GetEntity getEntity;
    private final MedicalFileRepository medicalFileRepository;
    private final ConsultationSheetRepository consultationSheetRepository;
    private final AnalysisRepository analysisRepository;
    private final AnalysisFileRepository analysisFileRepository;
    private final PreinscriptionRepository preinscriptionRepository;
    private final DrugRepository drugRepository;

    public DeleteEntity(
            GetEntity getEntity,
            MedicalFileRepository medicalFileRepository,
            ConsultationSheetRepository consultationSheetRepository,
            AnalysisRepository analysisRepository,
            AnalysisFileRepository analysisFileRepository,
            PreinscriptionRepository preinscriptionRepository,
            DrugRepository drugRepository
    ) {
        this.getEntity = getEntity;
        this.medicalFileRepository = medicalFileRepository;
        this.consultationSheetRepository = consultationSheetRepository;
        this.analysisRepository = analysisRepository;
        this.analysisFileRepository = analysisFileRepository;
        this.preinscriptionRepository = preinscriptionRepository;
        this.drugRepository = drugRepository;
    }

    //Delete Medicale file
    private void deleteConsultationSheetOfMedicalFile (MedicalFile medicalFile) throws AnalysisNotFoundException, PreinscriptionNotFoundException {
        for ( ConsultationSheet consultationSheet : this.consultationSheetRepository.findByMedicalFile(medicalFile) ) {
            this.deleteConsultationSheet(consultationSheet);
        }
    }
    public void deleteMedicalFile (Integer medicalFileId) throws MedicalFileNotFoundException, AnalysisNotFoundException, PreinscriptionNotFoundException {
        MedicalFile medicalFile = this.getEntity.getMedicalFile(medicalFileId);
        this.deleteConsultationSheetOfMedicalFile(medicalFile);
        this.medicalFileRepository.delete(medicalFile);
    }


    //Delete Consultation sheet
    private void deleteAnalysisOfConsultationSheet (ConsultationSheet consultationSheet) throws AnalysisNotFoundException {
        for ( Analysis analysis  : this.analysisRepository.findByConsultationSheet(consultationSheet) ) {
            this.deleteAnalysis(analysis);
        }
    }
    private void deletePreinscriptionOfConsultationSheet (ConsultationSheet consultationSheet) throws PreinscriptionNotFoundException {
        for ( Preinscription preinscription  : this.preinscriptionRepository.findByConsultationSheet(consultationSheet) ) {
            this.deletePreinscription(preinscription);
        }
    }
    public void deleteConsultationSheet (Integer consultationSheetId) throws ConsultationSheetNotFoundException, AnalysisNotFoundException, PreinscriptionNotFoundException {
        ConsultationSheet consultationSheet = this.getEntity.getConsultationSheet(consultationSheetId);
        this.deleteConsultationSheet(consultationSheet);
    }
    public void deleteConsultationSheet (ConsultationSheet consultationSheet) throws AnalysisNotFoundException, PreinscriptionNotFoundException {
        this.deleteAnalysisOfConsultationSheet(consultationSheet);
        this.deletePreinscriptionOfConsultationSheet(consultationSheet);
        this.consultationSheetRepository.delete(consultationSheet);
    }


    //Delete Analysis
    private void deleteAnalysisFileOfAnalysis (Analysis analysis) {
        for ( AnalysisFile analysisFile : this.analysisFileRepository.findByAnalysis(analysis) ) {
            this.deleteAnalysisFile(analysisFile);
        }
    }
    public void deleteAnalysis (Integer AnalysisId) throws AnalysisNotFoundException {
        Analysis analysis = this.getEntity.getAnalysis(AnalysisId);
        this.deleteAnalysis(analysis);
    }
    public void deleteAnalysis (Analysis analysis) {
        this.deleteAnalysisFileOfAnalysis(analysis);
        this.analysisRepository.delete(analysis);
    }


    //Delete Analysis File
    public void deleteAnalysisFile (Integer analysisFileId) throws AnalysisFileNotFoundException {
        AnalysisFile analysisFile = this.getEntity.getAnalysisFile(analysisFileId);
        this.deleteAnalysisFile(analysisFile);
    }
    public void deleteAnalysisFile (AnalysisFile analysisFile) {
        this.analysisFileRepository.delete(analysisFile);
    }



    public void deletePreinscription (Integer preinscriptionId) throws PreinscriptionNotFoundException {
        Preinscription preinscription = this.getEntity.getPreinscription(preinscriptionId);
        this.deletePreinscription(preinscription);
    }
    public void deletePreinscription (Preinscription preinscription) throws PreinscriptionNotFoundException {
        this.preinscriptionRepository.delete(preinscription);
    }

    public void deleteDrug (Integer drugId) throws DrugNotFoundException {
        Drug drug = this.getEntity.getDrug(drugId);
        this.drugRepository.delete(drug);
    }

    public void deletePreinscriptionOfDrug (Integer preinscriptionId, Integer drugId) throws PreinscriptionNotFoundException, DrugNotFoundException {
        Preinscription preinscription = this.getEntity.getPreinscription(preinscriptionId);
        Drug drug = this.getEntity.getDrug(drugId);
        List<Preinscription> preinscriptions = drug.getPreinscriptions();
        preinscriptions.remove(preinscription);
        drug.setPreinscriptions( preinscriptions );
        this.drugRepository.save(drug);
    }
}
