import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class ConfigurationProfile {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @Column()
  theme: string;

  @OneToOne(() => Profile, (profile) => profile.configurationProfile)
  profile: Profile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
