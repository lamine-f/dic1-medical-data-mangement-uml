package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.MedicalFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;

import java.util.List;

public interface ConsultationSheetService {
    public List<ConsultationSheetDto> getConsultationSheets ();
    public List<ConsultationSheetDto> getConsultationSheetsOfMedicalFile (Integer id) throws MedicalFileNotFoundException;

    public ConsultationSheet create(ConsultationSheetDto consultationSheetDto, Integer medicalFileId) throws MedicalFileNotFoundException;

    ConsultationSheet modify(ConsultationSheetDto consultationSheetDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException;

    Boolean delete(Integer id) throws PreinscriptionNotFoundException, ConsultationSheetNotFoundException, AnalysisNotFoundException;
}
