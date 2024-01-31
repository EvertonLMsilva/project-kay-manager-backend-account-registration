import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../../core/dto/create-profile.dto';
import { UpdateProfileDto } from '../../core/dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../core/entities/profile.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/core/entities/person.entity';
import { ConfigurationProfile } from 'src/core/entities/ConfigurationProfile.entity';
import { validateCPF } from 'src/core/utils/helpers';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(ConfigurationProfile)
    private configurationProfileRepository: Repository<ConfigurationProfile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const { person, configurationProfile } = createProfileDto;
      if (!person.cpf || !validateCPF(person.cpf))
        throw new BadRequestException('CPF inválid!');

      const findPerson = await this.personRepository.findOne({
        where: {
          cpf: person.cpf,
        },
      });

      if (findPerson) throw new BadRequestException('CPF already registered!');

      const createPerson = await this.personRepository.save(person);

      const createConfiguration =
        await this.configurationProfileRepository.save(configurationProfile);

      if (!createPerson || !createConfiguration)
        throw new BadRequestException('Error on create profile!');

      const createProfile = await this.profileRepository.save({
        userId: createProfileDto?.userId,
        person: createPerson,
        configurationProfile: createConfiguration,
      });

      return createProfile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<[Profile[], number]> {
    const getAllUser = await this.profileRepository.findAndCount({
      relations: {
        configurationProfile: true,
        person: true,
      },
    });

    return getAllUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile ${updateProfileDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
