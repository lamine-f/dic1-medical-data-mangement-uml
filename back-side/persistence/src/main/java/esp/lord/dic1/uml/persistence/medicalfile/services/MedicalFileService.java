package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.exceptions.PatientNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;

import java.util.List;

public interface MedicalFileService {
    public List<MedicalFileDto> getMedicalFiles ();
    public List<MedicalFileDto> getMedicalFilesOfPatient (Integer id) throws PatientNotFoundException;

    public MedicalFile create(MedicalFileDto medicalFileDto, Integer PatientId) throws PatientNotFoundException;

    boolean delete(Integer id) throws MedicalFileNotFoundException, ConsultationSheetNotFoundException, AnalysisNotFoundException, PreinscriptionNotFoundException;

    MedicalFile modify(MedicalFileDto medicalFileDto, Integer medicalFileId) throws MedicalFileNotFoundException, ConsultationSheetNotFoundException;
}
