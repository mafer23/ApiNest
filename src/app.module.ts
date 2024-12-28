import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entity/users.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...DataSourceConfig,
   //   autoLoadEntities: true, // Carga automática de entidades (opcional)

    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class AppModule {}
