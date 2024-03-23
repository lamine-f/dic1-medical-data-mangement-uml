package esp.lord.dic1.uml.persistence.medicalfile.services;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.PreinscriptionDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;

import java.util.List;

public interface PreinscriptionService {
    List<PreinscriptionDto> getPreinscription ();
    List<PreinscriptionDto> getPreinscriptionOfConsultationSheet (Integer id) throws ConsultationSheetNotFoundException;
    Preinscription create(PreinscriptionDto preinscriptionDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException;

    Preinscription modify(PreinscriptionDto preinscriptionDto, Integer preinscriptionId) throws PreinscriptionNotFoundException;

    Boolean delete(Integer id) throws PreinscriptionNotFoundException;
}
