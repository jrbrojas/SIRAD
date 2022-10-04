
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EmergencyFakeData } from '../db/emergency.data';
import { PhenomenonFakeData } from '../db/phenomeno-db';
import { GroupPhenomenonFakeData } from '../db/group-phenomenon';
import { UbiegoFakeData } from '../db/ubigeo.data';
import { ChangeHistorieFakeData } from '../db/changehistorie.data';

import {
  BasicServicesFakeData,
  Ceiling, ChronicIllness,
  Floor,
  Form2B,
  InfrastructureFakeData,
  LifeHealthFakeData,
  LivelihoodsFakeData,
  NeedsSupport,
  OtherActivitiesFakeData,
  OtherNeedsFakeData,
  TaskTodo,
  TypeDocument,
  Wall,
  PersonDisability,
  PersonalInjure
} from '../db/life-health';

export class FakeDbService implements InMemoryDbService {

  constructor() { }

  createDb(): any {
    return {
      'emergencies': EmergencyFakeData.emergencies,
      'phenomenons': PhenomenonFakeData.phenomenons,
      'group-phenomenon': GroupPhenomenonFakeData.groupPhenomenons,
      'ubigeos': UbiegoFakeData.ubigeos,
      'change-historie':ChangeHistorieFakeData.ChangeHistorie,
      'life_health':LifeHealthFakeData.life_health,
      'basic_services':BasicServicesFakeData.basic_services,
      'infrastructures':InfrastructureFakeData.infrastructure,
      'livelihoods':LivelihoodsFakeData.livelihoods,
      'task-todo':TaskTodo.taskTodo,
      'needs-support':NeedsSupport.needsSupport,
      'other-activities': OtherActivitiesFakeData.OtherActivities,
      'other-needs': OtherNeedsFakeData.otherNeeds,
      'type-documents': TypeDocument.typeDocument,
      'form-2b': Form2B.form2b,
      'ceiling': Ceiling.ceiling,
      'wall': Wall.wall,
      'floor': Floor.floor,
      'chronic-illness': ChronicIllness.chronicIllness,
      'person-disability': PersonDisability.personDisability,
      'personal-injure': PersonalInjure.personInjure,
    }
  }
}
