package esp.lord.dic1.uml.persistence.medicalfile.services.impl;

import esp.lord.dic1.uml.persistence.medicalfile.dtos.DrugDto;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Drug;
import esp.lord.dic1.uml.persistence.medicalfile.entities.ConsultationSheet;
import esp.lord.dic1.uml.persistence.medicalfile.entities.Preinscription;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.ConsultationSheetNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.DrugNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.exceptions.PreinscriptionNotFoundException;
import esp.lord.dic1.uml.persistence.medicalfile.repositories.DrugRepository;
import esp.lord.dic1.uml.persistence.medicalfile.services.DrugService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IDrugService implements DrugService {
    private final DrugRepository drugRepository;
    private final GetEntity getEntity;
    public IDrugService(
            DrugRepository drugRepository,
            GetEntity getEntity
            ) {
        this.drugRepository = drugRepository;
        this.getEntity = getEntity;
    }

    public List<DrugDto> drugToModels(List<Drug> drugs) {
        return drugs.stream().map(DrugDto::toDrugDto).toList();
    }

    @Override
    public List<DrugDto> getDrugs() {
        List<Drug> drugs = this.drugRepository.findAll();
        return this.drugToModels(drugs);
    }

    @Override
    public List<DrugDto> getDrugsOfPreinscription(Integer id) throws PreinscriptionNotFoundException {
        Preinscription preinscription = this.getEntity.getPreinscription(id);
        List<Drug> drug = this.drugRepository.findByPreinscriptionsContains(preinscription);
        return this.drugToModels(drug);
    }


    @Override
    public Drug create(DrugDto drugDto) {
        Drug drugSaving = DrugDto.toDrug(drugDto);
        drugSaving.setPreinscriptions( new ArrayList<>() );
        Drug drugSaved = drugRepository.save(drugSaving);
        return drugSaved;
    }
    @Override
    public Drug add(Integer drugId, Integer preinscriptionId) throws PreinscriptionNotFoundException, DrugNotFoundException {
        Drug drugSaving = this.getEntity.getDrug(drugId);
        Preinscription preinscription = this.getEntity.getPreinscription(preinscriptionId);
        List<Preinscription> preinscriptions = drugSaving.getPreinscriptions();
        preinscriptions.add(preinscription);
        drugSaving.setPreinscriptions( preinscriptions );
        Drug drugSaved = drugRepository.save(drugSaving);
        return drugSaved;
    }
}
