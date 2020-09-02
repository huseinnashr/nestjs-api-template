import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as TypeOrmConfig from './config/typeorm.config';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { ManagerProjectModule } from './manager-project/manager-project.module';
import { ErrorsInterceptor } from './core/interceptor';
import { ManagerModule } from './manager/manager.module';
import { ProfilePictureModule } from './profile-picture/profile-picture.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule,
    EmployeeModule,
    ManagerProjectModule,
    ManagerModule,
    ProfilePictureModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
