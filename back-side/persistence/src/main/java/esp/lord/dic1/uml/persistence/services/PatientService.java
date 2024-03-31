package esp.lord.dic1.uml.persistence.services;

import esp.lord.dic1.uml.persistence.dtos.PatientDto;
import esp.lord.dic1.uml.persistence.entities.Patient;
import esp.lord.dic1.uml.persistence.exceptions.PatientNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;

import java.util.List;

public interface PatientService {
    List<PatientDto> getPatients ();
    Patient getPatientById (Integer integer) throws PatientNotFoundException;
    Patient create(PatientDto patientDto);
    Patient modify(PatientDto patientDto, Integer patientId) throws PatientNotFoundException;
    Boolean delete(Integer id);

}
