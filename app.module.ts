import { Module } from '@nestjs/common';
import { UserModule } from './lib/User/infrastructure/NestJs/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserEntity } from './lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.qpsefnveacavgjpueeau.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'LuUO0bNsNecQWWUm',
      database: 'postgres',
      entities: [TypeOrmUserEntity],
      logging: true,
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
