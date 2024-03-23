package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.PreinscriptionDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;

import java.util.List;

public interface PreinscriptionService {
    List<PreinscriptionDto> getPreinscription ();
    List<PreinscriptionDto> getPreinscriptionOfConsultationSheet (Integer id) throws ConsultationSheetNotFoundException;
    Preinscription create(PreinscriptionDto preinscriptionDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException;
}
