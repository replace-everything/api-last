// src/app.module.ts
import { Module, NestModule, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerController } from './swagger/swagger.controller';
import { RouterModule } from '@nestjs/core';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PhotosModule } from './photos/photos.module';
import { InspectionsModule } from './inspections/inspections.module';
import { TasksModule } from './tasks/tasks.module';
import { ContingenciesModule } from './contingencies/contingencies.module';
import { LeadPhotoModule } from './lead-photos/lead-photos.module';
import { DatabaseConfigModule } from './config/database-config.module';
import { DatabaseModule } from './database.module';
import { ClientsModule } from './clients/clients.module';
import { BuildingsModule } from './buildings/buildings.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'events',
        module: EventsModule,
      },
      {
        path: 'leads',
        module: LeadsModule,
      },
      {
        path: 'invoices',
        module: InvoicesModule,
      },
      {
        path: 'photos',
        module: PhotosModule,
      },
      {
        path: 'inspections',
        module: InspectionsModule,
      },
      {
        path: 'tasks',
        module: TasksModule,
      },
      {
        path: 'contingencies',
        module: ContingenciesModule,
      },
      {
        path: 'lead-photos',
        module: LeadPhotoModule,
      },
      {
        path: 'clients',
        module: ClientsModule,
      },
      {
        path: 'buildings',
        module: BuildingsModule,
      },
      {
        path: 'companies',
        module: CompaniesModule,
      },
    ]),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    AuthModule,
    DatabaseConfigModule,
    DatabaseModule,
  ],
  controllers: [AppController, SwaggerController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  // constructor(private lazyModuleLoader: LazyModuleLoader) {}
  onModuleInit() {
    // * Optional initialization logic on module start
  }

  // app.module.ts
  configure() {
    // configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(async (req, res, next) => {
    //     const moduleName = req.path.split('/')[1];
    //     const module = await this.lazyModuleLoader.load(moduleName);
    //     try {
    //       await module.use(req, res, next);
    //       console.log('Middleware execution completed');
    //     } catch (error) {
    //       console.error('Error in middleware execution:', error);
    //       next(error);
    //     }
    //   })
    //   .forRoutes('*');
  }
}
