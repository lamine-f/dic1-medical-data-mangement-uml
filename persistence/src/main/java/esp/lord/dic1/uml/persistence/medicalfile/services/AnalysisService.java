package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.ConsultationSheetDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.MedicalFileNotFoundException;

import java.util.List;

public interface AnalysisService {
    public List<AnalysisDto> getAnalysis ();
    public List<AnalysisDto> getAnalysisOfConsultationSheet (Integer id) throws ConsultationSheetNotFoundException;
    public Analysis create(AnalysisDto analysisDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException;
}
