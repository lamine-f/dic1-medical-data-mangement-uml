package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.ConsultationSheetRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.ConsultationSheetService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IConsultationSheetService implements ConsultationSheetService {
    private final ConsultationSheetRepository consultationSheetRepository;
    private final GetEntity getEntity;
    private final DeleteEntity deleteEntity;
    public IConsultationSheetService(
            ConsultationSheetRepository consultationSheetRepository,
            GetEntity getEntity,
            DeleteEntity deleteEntity) {
        this.consultationSheetRepository = consultationSheetRepository;
        this.getEntity = getEntity;
        this.deleteEntity = deleteEntity;
    }

    public List<ConsultationSheetDto> consultationSheetsToModels(List<ConsultationSheet> consultationSheets) {
        return consultationSheets.stream().map(ConsultationSheetDto::toConsultationSheetModel).toList();
    }

    @Override
    public List<ConsultationSheetDto> getConsultationSheets() {
        List<ConsultationSheet> consultationSheets = this.consultationSheetRepository.findAll();
        return this.consultationSheetsToModels(consultationSheets);
    }

    @Override
    public List<ConsultationSheetDto> getConsultationSheetsOfMedicalFile(Integer id) throws MedicalFileNotFoundException {
        MedicalFile medicalFile = this.getEntity.getMedicalFile(id);
        List<ConsultationSheet> consultationSheets = this.consultationSheetRepository.findByMedicalFile(medicalFile);
        return this.consultationSheetsToModels(consultationSheets);
    }

    @Override
    public ConsultationSheet create(ConsultationSheetDto consultationSheetDto, Integer medicalFileId) throws MedicalFileNotFoundException {
        ConsultationSheet consultationSheetSaving = ConsultationSheetDto.toConsultationSheet(consultationSheetDto);
        consultationSheetSaving.setAnalyzes(new ArrayList<>());

        MedicalFile medicalFile = this.getEntity.getMedicalFile(medicalFileId);
        consultationSheetSaving.setMedicalFile( medicalFile );

        ConsultationSheet consultationSheetSaved = consultationSheetRepository.save(consultationSheetSaving);
        return consultationSheetSaved;
    }

    @Override
    public ConsultationSheet modify(ConsultationSheetDto consultationSheetDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException {
        ConsultationSheet consultationSheetModifying = this.getEntity.getConsultationSheet(consultationSheetId);
        ConsultationSheet consultationSheetSaving = ConsultationSheetDto.toConsultationSheet(consultationSheetDto);
        consultationSheetSaving.setSheetNumber(consultationSheetModifying.getSheetNumber() );
        consultationSheetSaving.setMedicalFile( consultationSheetModifying.getMedicalFile() );
        return this.consultationSheetRepository.save(consultationSheetSaving);
    }

    @Override
    public Boolean delete(Integer id) throws PreinscriptionNotFoundException, ConsultationSheetNotFoundException, AnalysisNotFoundException {
        this.deleteEntity.deleteConsultationSheet(id);
        return true;
    }
}
