import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './presentation/controllers/users.controller';
import { CreateUserUseCase } from './application/useCases/createUser/createUserUseCase';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/users.repository.token';
import { TypeOrmUserRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-users.repository';
import { User as OrmUser } from './infrastructure/persistence/typeorm/entities/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrmUser])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [CreateUserUseCase],
})
export class UsersModule {}
