package esp.lord.dic1.uml.persistence.medicalfile.dtos;

import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@NoArgsConstructor @AllArgsConstructor @ToString @Setter @Getter
public class ConsultationSheetDto implements Serializable {
    Integer sheetNumber;
    Date creationDate;
    Date modificationDate;
    String notes;
//    MedicalFileDto medicalFile;
//    List<AnalysisDto> analyzes;

    public static ConsultationSheetDto toConsultationSheetModel (ConsultationSheet consultationSheet) {
        ConsultationSheetDto consultationSheetDto = new ConsultationSheetDto();
        consultationSheetDto.setCreationDate( consultationSheet.getCreationDate() );
        consultationSheetDto.setModificationDate( consultationSheet.getModificationDate() );
        consultationSheetDto.setNotes( consultationSheet.getNotes() );
        consultationSheetDto.setSheetNumber( consultationSheet.getSheetNumber() );
        return consultationSheetDto;
    }

    public static ConsultationSheet toConsultationSheet (ConsultationSheetDto consultationSheetDto) {
        ConsultationSheet consultationSheet = new ConsultationSheet();
        consultationSheet.setCreationDate( consultationSheetDto.getCreationDate() );
        consultationSheet.setModificationDate( consultationSheetDto.getModificationDate() );
        consultationSheet.setNotes( consultationSheetDto.getNotes() );
        return consultationSheet;
    }
}
