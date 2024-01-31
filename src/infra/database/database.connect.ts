import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRE_HOST,
  port: parseInt(process.env.POSTGRE_PORT),
  username: `${process.env.POSTGRE_USER}`,
  password: `${process.env.POSTGRE_PASSWORD}`,
  database: process.env.POSTGRE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,
};
