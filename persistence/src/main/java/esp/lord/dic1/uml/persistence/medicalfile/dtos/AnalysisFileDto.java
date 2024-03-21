package esp.lord.dic1.uml.persistence.medicalfile.dtos;

import esp.lord.dic1.uml.persistence.medicalfile.entities.Analysis;
import esp.lord.dic1.uml.persistence.medicalfile.entities.AnalysisFile;
import lombok.*;

import java.io.Serializable;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class AnalysisFileDto implements Serializable {
    Integer id;
    String title;
    String fileUrl;
    String specifics;

//    AnalysisDto analysis;

    public static AnalysisFileDto toAnalysisFileDto (AnalysisFile analysisFile) {
        AnalysisFileDto analysisFileDto = new AnalysisFileDto();
        analysisFileDto.setTitle( analysisFile.getTitle() );
        analysisFileDto.setFileUrl( analysisFile.getFileUrl() );
        analysisFileDto.setSpecifics( analysisFile.getSpecifics() );
        analysisFileDto.setId( analysisFile.getId() );
        return analysisFileDto;
    }

    public static AnalysisFile toAnalysisFile (AnalysisFileDto analysisFileDto) {
        AnalysisFile analysisFile = new AnalysisFile();
        analysisFile.setTitle( analysisFileDto.getTitle() );
        analysisFile.setFileUrl( analysisFileDto.getFileUrl() );
        analysisFile.setSpecifics( analysisFileDto.getSpecifics() );
        return analysisFile;
    }
}


