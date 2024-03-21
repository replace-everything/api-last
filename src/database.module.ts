import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './config/database-config.module';
import { DatabaseConfigService } from './config/database-config.service';

@Module({
  imports: [
    DatabaseConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (dbConfigService: DatabaseConfigService) => {
        const dbConfig = await dbConfigService.getDatabaseConfig();
        return {
          ...dbConfig,
          autoLoadEntities: true,
          database: 'DBSUPERIORDEMO',
          cache: {
            duration: 30000,
          },
          keepAlive: {
            interval: 30000,
          },
        };
      },
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
