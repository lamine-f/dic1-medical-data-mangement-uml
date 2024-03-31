package esp.lord.dic1.uml.persistence.services.impl;

import esp.lord.dic1.uml.persistence.entities.Patient;
import esp.lord.dic1.uml.persistence.exceptions.PatientNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.entities.*;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.*;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.*;
import esp.lord.dic1.uml.persistence.repositories.PatientRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;


public class GetEntity {
    private final PatientRepository patientRepository;
    public GetEntity(
            PatientRepository patientRepository, ConsultationSheetRepository consultationSheetRepository
            ) {
        this.patientRepository = patientRepository;
    }

    public Patient getPatient (Integer patientId) throws PatientNotFoundException {
        Patient patient = this.patientRepository.findById(patientId).orElse(null);
        if ( patient == null )
            throw new PatientNotFoundException("patient not found");
        return patient;
    }

}
