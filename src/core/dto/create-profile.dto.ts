import { ConfigurationProfile } from '../entities/ConfigurationProfile.entity';
import { Person } from '../entities/person.entity';

export class CreateProfileDto {
  userId: string;
  person: Person;
  configurationProfile: ConfigurationProfile;
}
