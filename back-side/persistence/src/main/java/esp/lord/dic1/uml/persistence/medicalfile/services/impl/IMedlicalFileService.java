package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.MedicalFileRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.MedicalFileService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IMedlicalFileService implements MedicalFileService {

    private MedicalFileRepository medicalFileRepository;

    public IMedlicalFileService(MedicalFileRepository medicalFileRepository) {
        this.medicalFileRepository = medicalFileRepository;
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
    public MedicalFile createMedicalFile(MedicalFileDto medicalFileDto) {
        MedicalFile medicalFileSaving = MedicalFileDto.toMedicalFile(medicalFileDto);
        medicalFileSaving.setConsultationSheets(new ArrayList<>());
        MedicalFile medicalFileSaved = medicalFileRepository.save(medicalFileSaving);
        return medicalFileSaved;
    }


}
