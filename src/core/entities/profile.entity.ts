import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from './person.entity';
import { ConfigurationProfile } from './ConfigurationProfile.entity';
import { StatusModel } from '../enums/StatusModel.enum';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => Person, (person) => person.profile)
  @JoinColumn()
  person: Person;

  @Column({ default: StatusModel.ACTIVE })
  status: StatusModel;

  @OneToOne(
    () => ConfigurationProfile,
    (configurationProfile) => configurationProfile.profile,
  )

  @JoinColumn()
  configurationProfile: ConfigurationProfile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
