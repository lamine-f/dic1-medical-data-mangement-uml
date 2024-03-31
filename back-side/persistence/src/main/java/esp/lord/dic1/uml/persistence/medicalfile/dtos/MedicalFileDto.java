package esp.lord.dic1.uml.persistence.medicalfile.dtos;

import esp.lord.dic1.uml.persistence.medicalfile.entities.MedicalFile;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor @AllArgsConstructor @ToString @Setter @Getter
public class MedicalFileDto implements Serializable {
    Integer fileNumber;
    Date creationDate;
    Date modificationDate;
    Integer patientId;
    public static MedicalFileDto toMedicalFileDto (MedicalFile medicalFile) {
        MedicalFileDto medicalFileDto = new MedicalFileDto();
        medicalFileDto.setCreationDate( medicalFile.getCreationDate() );
        medicalFileDto.setModificationDate( medicalFile.getModificationDate() );
        medicalFileDto.setFileNumber(medicalFile.getFileNumber() );
        medicalFileDto.setPatientId( medicalFile.getPatient().getId() );
        //        medicalFileDto.setConsultationSheets(
//                medicalFile.getConsultationSheets().stream().map(ConsultationSheetDto::toConsultationSheetModel).toList()
//        );
        return medicalFileDto;
    }

    public static MedicalFile toMedicalFile (MedicalFileDto medicalFileDto) {
        MedicalFile medicalFile= new MedicalFile();
        medicalFile.setCreationDate( medicalFileDto.getCreationDate() );
        medicalFile.setModificationDate( medicalFileDto.getModificationDate() );
        return medicalFile;
    }

}
