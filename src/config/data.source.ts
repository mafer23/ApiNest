import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";




dotenv.config({ path: '.develop.env' });


ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export const DataSourceConfig : DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    schema: configService.get('DATABASE_SCHEMA'),
    entities: [path.join(__dirname, '../../src/entity/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../../src/migration/*{.ts,.js}') ],
    synchronize: false,
    migrationsRun: true,  // Ejecuta migraciones automáticamente
    logging: false,
  namingStrategy: new SnakeNamingStrategy(),
}

console.log('entity Path:', DataSourceConfig.entities);
console.log('Migrations Path:', DataSourceConfig.migrations);


export const AppDS = new DataSource(DataSourceConfig);

AppDS.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        console.log(`Database is running on host: ${DataSourceConfig.host} and port: ${DataSourceConfig.port}`);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })