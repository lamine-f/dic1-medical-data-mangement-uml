package esp.lord.dic1.uml.persistence.medicalfile.dtos;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class AnalysisDto implements Serializable {
    Integer id;
    String description;
    Date date;
    String observation;
//    ConsultationSheetDto consultationSheet;
//    List<AnalysisFileDto> analysisFiles;


    public static AnalysisDto toAnalysisDto (Analysis analysis) {
        AnalysisDto analysisDto = new AnalysisDto();
        analysisDto.setDate( analysis.getDate() );
        analysisDto.setDescription( analysis.getDescription() );
        analysisDto.setObservation( analysis.getObservation() );
        analysisDto.setId( analysis.getId() );
        return analysisDto;
    }

    public static Analysis toAnalysis (AnalysisDto analysisDto) {
        Analysis analysis = new Analysis();
        analysis.setDate( analysisDto.getDate() );
        analysis.setDescription( analysisDto.getDescription() );
        analysis.setObservation(analysisDto.getObservation() );
        return analysis;
    }
}

