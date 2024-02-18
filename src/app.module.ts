import { Module } from '@nestjs/common';
import { typeOrmConfig } from './infra/database/database.connect';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { InvoicesModule } from './invoices/invoices.module';
@Module({
  imports: [
    ProfileModule,
    InvoicesModule,
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
    }),
  ],
  providers: [],
})
export class AppModule {}
