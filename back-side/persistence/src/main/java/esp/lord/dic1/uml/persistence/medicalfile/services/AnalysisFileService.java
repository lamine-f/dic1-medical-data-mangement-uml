package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisFileDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.AnalysisFile;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.AnalysisNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;

import java.util.List;

public interface AnalysisFileService {
    public List<AnalysisFileDto> getAnalysisFiles ();
    public List<AnalysisFileDto> getAnalysisFilesOfAnalysis (Integer id) throws AnalysisNotFoundException;

    public AnalysisFile create(AnalysisFileDto consultationSheetDto, Integer medicalFileId) throws MedicalFileNotFoundException, AnalysisNotFoundException;
}
