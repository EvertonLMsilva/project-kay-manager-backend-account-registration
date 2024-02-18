import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { StatusModel } from '../enums/StatusModel.enum';

@Entity()
export class ConfigurationProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  theme: string;

  @Column({ default: StatusModel.ACTIVE })
  status: StatusModel;

  @OneToOne(() => Profile, (profile) => profile.configurationProfile)
  profile: Profile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
