import { ClientsModule } from './clients/clients.module';
import { DataSource } from 'typeorm';
import { Module, NestModule, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { PhotosModule } from './photos/photos.module';
import { InspectionsModule } from './inspections/inspections.module';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerController } from './swagger/swagger.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DatabaseModule,
    UsersModule,
    LeadsModule,
    InvoicesModule,
    ClientsModule,
    PhotosModule,
    InspectionsModule,
    EventsModule,
    TasksModule,
  ],
  controllers: [AppController, SwaggerController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(public dataSource: DataSource) {}

  onModuleInit() {
    // * Optional initialization logic on module start
  }

  configure() {
    // * Apply middleware for all routes
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
