package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;

import java.util.List;

public interface MedicalFileService {
    public List<MedicalFileDto> getMedicalFiles ();
    public List<MedicalFileDto> getMedicalFilesOfPatient (Integer id);

    public MedicalFile createMedicalFile(MedicalFileDto medicalFileDto);
}
