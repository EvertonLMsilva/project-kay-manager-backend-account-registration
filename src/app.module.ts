import { Module } from '@nestjs/common';
import { typeOrmConfig } from './infra/database/database.connect';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/module/profile.module';
@Module({
  imports: [
    ProfileModule,
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
    }),
  ],
  providers: [],
})
export class AppModule {}
