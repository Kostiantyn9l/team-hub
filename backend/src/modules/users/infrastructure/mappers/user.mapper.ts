import { User as OrmUser } from '../persistence/typeorm/entities/user.orm-entity';
import { User } from '../../domain/entities/user.entity';

import { Name } from '../../domain/value-objects/name.vo';
import { Email } from '../../domain/value-objects/email.vo';

export class UserMapper {
  static toDomain(orm: OrmUser): User {
    return User.restore(
      orm.id,
      new Name(orm.name),
      new Email(orm.email),
      orm.password,
      orm.is_email_verified,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toOrm(domain: User): Partial<OrmUser> {
    return {
      id: domain.Id,
      name: domain.Name.value,
      email: domain.Email.value,
      password: domain.Password,
      is_email_verified: domain.IsEmailVerified,
    };
  }
}
