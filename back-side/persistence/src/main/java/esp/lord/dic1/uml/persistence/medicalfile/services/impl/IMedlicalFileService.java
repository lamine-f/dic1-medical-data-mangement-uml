package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.MedicalFileRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.MedicalFileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class IMedlicalFileService implements MedicalFileService {

    private final MedicalFileRepository medicalFileRepository;
    private final GetEntity getEntity;
    private final DeleteEntity deleteEntity;

    public IMedlicalFileService(
            MedicalFileRepository medicalFileRepository,
            GetEntity getEntity,
            DeleteEntity deleteEntity
    ) {
        this.medicalFileRepository = medicalFileRepository;
        this.getEntity = getEntity;
        this.deleteEntity = deleteEntity;
    }

    public List<MedicalFileDto> medicalFilesToModels(List<MedicalFile> medicalFiles) {
        return medicalFiles.stream().map(MedicalFileDto::toMedicalFileDto).toList();
    }
    @Override
    public List<MedicalFileDto> getMedicalFiles() {
        List<MedicalFile> medicalFiles = this.medicalFileRepository.findAll();
        return this.medicalFilesToModels(medicalFiles);
    }

    @Override
    public List<MedicalFileDto> getMedicalFilesOfPatient(Integer id) {
        //[TODO] GET PATIENT MEDICAL FILES
        List<MedicalFile> medicalFiles = this.medicalFileRepository.findAll();
        return this.medicalFilesToModels(medicalFiles);
    }

    @Override
    public MedicalFile create(MedicalFileDto medicalFileDto) {
        MedicalFile medicalFileSaving = MedicalFileDto.toMedicalFile(medicalFileDto);
        medicalFileSaving.setConsultationSheets(new ArrayList<>());
        MedicalFile medicalFileSaved = medicalFileRepository.save(medicalFileSaving);
        return medicalFileSaved;
    }

    @Override
    public boolean delete(Integer id) throws MedicalFileNotFoundException, ConsultationSheetNotFoundException, AnalysisNotFoundException, PreinscriptionNotFoundException {
        this.deleteEntity.deleteMedicalFile(id);
        return true;
    }

    @Override
    public MedicalFile modify(MedicalFileDto medicalFileDto, Integer medicalFileId) throws MedicalFileNotFoundException, ConsultationSheetNotFoundException {
        MedicalFile medicalFileModifying = this.getEntity.getMedicalFile(medicalFileId);
        MedicalFile medicalFileSaving = MedicalFileDto.toMedicalFile(medicalFileDto);
        medicalFileSaving.setConsultationSheets( medicalFileModifying.getConsultationSheets() );
        medicalFileSaving.setFileNumber( medicalFileModifying.getFileNumber() );
        return this.medicalFileRepository.save(medicalFileSaving);
    }


}
