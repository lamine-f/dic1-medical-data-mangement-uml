package esp.lord.dic1.uml.persistence.medicalfile.services.impl;
import esp.lord.dic1.uml.persistence.medicalfile.dtos.PreinscriptionDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.PreinscriptionRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.PreinscriptionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IPreinscriptionService implements PreinscriptionService {
    private final PreinscriptionRepository preinscriptionRepository;
    private final GetEntity getEntity;
    private final DeleteEntity deleteEntity;
    public IPreinscriptionService(
            PreinscriptionRepository preinscriptionRepository,
            GetEntity getEntity,
            DeleteEntity deleteEntity) {
        this.preinscriptionRepository = preinscriptionRepository;
        this.getEntity = getEntity;
        this.deleteEntity = deleteEntity;
    }
    public List<PreinscriptionDto> PreinscritionsToDtos(List<Preinscription> preinscriptions) {
        return preinscriptions.stream().map(PreinscriptionDto::toPreinscriptionDto).toList();
    }
    @Override
    public List<PreinscriptionDto> getPreinscription() {
        List<Preinscription> preinscriptions = this.preinscriptionRepository.findAll();
        return this.PreinscritionsToDtos(preinscriptions);
    }
    @Override
    public List<PreinscriptionDto> getPreinscriptionOfConsultationSheet (Integer id) throws ConsultationSheetNotFoundException {
        ConsultationSheet consultationSheet = this.getEntity.getConsultationSheet(id);
        List<Preinscription> preinscriptions = this.preinscriptionRepository.findByConsultationSheet(consultationSheet);
        return this.PreinscritionsToDtos(preinscriptions);
    }
    @Override
    public Preinscription create(PreinscriptionDto preinscriptionDto, Integer consultationSheetId) throws ConsultationSheetNotFoundException {
        Preinscription preinscriptionSaving = PreinscriptionDto.toPreinscription(preinscriptionDto);
        ConsultationSheet consultationSheet = this.getEntity.getConsultationSheet(consultationSheetId);
        preinscriptionSaving.setConsultationSheet( consultationSheet );
        preinscriptionSaving.setDrugs(new ArrayList<>());
        Preinscription preinscriptionSaved = this.preinscriptionRepository.save(preinscriptionSaving);
        return preinscriptionSaved;
    }

    @Override
    public Preinscription modify(PreinscriptionDto preinscriptionDto, Integer preinscriptionId) throws PreinscriptionNotFoundException {
        Preinscription preinscriptionModifying = this.getEntity.getPreinscription(preinscriptionId);
        Preinscription preinscriptionSaving = PreinscriptionDto.toPreinscription(preinscriptionDto);

        preinscriptionSaving.setId( preinscriptionModifying.getId() );
        preinscriptionSaving.setConsultationSheet( preinscriptionModifying.getConsultationSheet() );
        return this.preinscriptionRepository.save(preinscriptionSaving);
    }

    @Override
    public Boolean delete(Integer id) throws PreinscriptionNotFoundException {
        this.deleteEntity.deletePreinscription(id);
        return true;
    }
}
