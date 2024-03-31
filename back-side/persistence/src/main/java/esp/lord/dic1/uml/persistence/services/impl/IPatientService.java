package esp.lord.dic1.uml.persistence.services.impl;

import esp.lord.dic1.uml.persistence.dtos.PatientDto;
import esp.lord.dic1.uml.persistence.entities.Patient;
import esp.lord.dic1.uml.persistence.exceptions.PatientNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.DrugDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;
import esp.lord.dic1.uml.persistence.repositories.PatientRepository;
import esp.lord.dic1.uml.persistence.services.PatientService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IPatientService implements PatientService {
    private final PatientRepository patientRepository;
    public IPatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }


    public List<PatientDto> patientToModels(List<Patient> patients) {
        return patients.stream().map(PatientDto::toPatientDto).toList();
    }

    public Patient getPatientById (Integer integer) throws PatientNotFoundException {
        Patient patient = this.patientRepository.findById(integer).orElse(null);
        if ( patient == null ) {
            throw new PatientNotFoundException("patient not found exception");
        }

        return patient;
    }

    @Override
    public List<PatientDto> getPatients() {
        return patientToModels( this.patientRepository.findAll() );
    }

    @Override
    public Patient create(PatientDto patientDto) {
        Patient patient = PatientDto.toPatient(patientDto);
        return this.patientRepository.save(patient);
    }

    @Override
    public Patient modify(PatientDto patientDto, Integer patientId) throws PatientNotFoundException {
        Patient patientSaving = PatientDto.toPatient(patientDto);
        Patient patientSaved = this.getPatientById(patientId);
        patientSaving.setId( patientSaved.getId() );
        return this.patientRepository.save(patientSaving);
    }

    @Override
    public Boolean delete(Integer id) {
        this.patientRepository.deleteById(id);
        return true;
    }
}
