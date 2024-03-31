package esp.lord.dic1.uml.persistence.dtos;

import esp.lord.dic1.uml.persistence.entities.Patient;
import esp.lord.dic1.uml.persistence.enums.Sex;
import lombok.*;

import java.util.Date;

@NoArgsConstructor @AllArgsConstructor @Setter @Getter @ToString
public class PatientDto {
    Integer id;
    String lastName;
    String firstName;
    Sex sex;
    Date birthDay;
    String email;

    public static PatientDto toPatientDto (Patient patient) {
        PatientDto patientDto = new PatientDto();
        patientDto.setFirstName( patient.getFirstName() );
        patientDto.setLastName( patient.getLastName() );
        patientDto.setSex( patient.getSex() );
        patientDto.setBirthDay( patient.getBirthDay() );
        patientDto.setEmail( patient.getEmail() );
        patientDto.setId( patient.getId() );
        return patientDto;
    }

    public static Patient toPatient (PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setFirstName( patientDto.getFirstName() );
        patient.setLastName( patientDto.getLastName() );
        patient.setSex( patientDto.getSex() );
        patient.setBirthDay( patientDto.getBirthDay() );
        patient.setEmail( patientDto.getEmail() );
        return patient;
    }
}
