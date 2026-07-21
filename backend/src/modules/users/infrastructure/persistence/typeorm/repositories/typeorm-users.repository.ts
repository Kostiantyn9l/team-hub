import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository } from '@/modules/users/domain/repositories/users.repository.interface';
import { User } from '@/modules/users/domain/entities/user.entity';
import { User as OrmUser } from '../entities/user.orm-entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { UserMapper } from '../../../mappers/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(OrmUser)
    private readonly ormRepository: Repository<OrmUser>,
  ) {}

  async save(user: User): Promise<void> {
    const ormUser = UserMapper.toOrm(user);
    await this.ormRepository.save(ormUser);
  }

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.ormRepository.findOne({ where: { id } });
    if (!ormUser) return null;
    return UserMapper.toDomain(ormUser);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const ormUser = await this.ormRepository.findOne({
      where: { email: email.value },
    });
    if (!ormUser) return null;
    return UserMapper.toDomain(ormUser);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
