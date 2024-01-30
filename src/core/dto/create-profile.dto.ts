import { ConfigurationProfile } from '../entities/ConfigurationProfile.entity';
import { Person } from '../entities/person.entity';

export class CreateProfileDto {
  person: Person;
  configurationProfile: ConfigurationProfile;
}
