import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column()
  cpf: string;

  @OneToOne(() => Profile, (profile) => profile.person)
  profile: Profile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
