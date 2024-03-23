package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.AnalysisDto;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.DrugDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.DrugNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;

import java.util.List;

public interface DrugService {
    List<DrugDto> getDrugs ();
    List<DrugDto> getDrugsOfPreinscription (Integer id) throws PreinscriptionNotFoundException;
    Drug create(DrugDto drugDto);
    Drug add(Integer drugId, Integer preinscriptionId) throws PreinscriptionNotFoundException, DrugNotFoundException;
}
