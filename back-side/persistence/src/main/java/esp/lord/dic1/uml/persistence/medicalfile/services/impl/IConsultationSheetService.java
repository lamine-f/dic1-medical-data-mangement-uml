package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.ConsultationSheetRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.ConsultationSheetService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IConsultationSheetService implements ConsultationSheetService {
    private ConsultationSheetRepository consultationSheetRepository;
    private GetEntity getEntity;
    public IConsultationSheetService(
            ConsultationSheetRepository consultationSheetRepository,
            GetEntity getEntity
            ) {
        this.consultationSheetRepository = consultationSheetRepository;
        this.getEntity = getEntity;
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
}
