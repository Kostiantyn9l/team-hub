# TeamHub Backend Architecture

## 1. General Concept

The TeamHub project’s backend is built on the following principles:

- Clean Architecture
- Domain-Driven Design (DDD)
- Hexagonal Architecture (Ports & Adapters)

The goal of the architecture is to separate business logic from frameworks, databases, and external services so that the system is:
- testable
- scalable
- maintainable
- technology-agnostic

---

## 2. Core Principles

### 2.1. Dependency Rule

Dependencies are directed inward:
- Infrastructure → Application → Domain
- Presentation → Application → Domain

The Domain layer does not depend on any external layer.

---

### 2.2. Business First

Business logic is always located in:

- Domain
- Application

And not in:
- Controllers
- Repositories
- ORM entities

---

### 2.3. Modules over layers

The system is divided into business modules:

- auth
- user
- project
- task
- chat
- notification

Each module is self-contained.

---

## 3. Project Structure
```
src/
modules/

auth/
user/
project/
task/
chat/
notification/

  domain/
  application/
  infrastructure/
  presentation/

shared/

domain/
infrastructure/

main.ts
```
---

## 4. Description of Layers

## 4.1 Domain Layer (system core)

Contains business logic and rules.

### Includes:

- Entities
- Value Objects
- Domain Services
- Repository Interfaces (ports)

### Example structure:
```
domain/
entities/
value-objects/
services/
interfaces/
```

### Example Entity:

```ts
export class User {
  constructor(
    public readonly id: UserId,
    public email: Email,
    private passwordHash: string,
  ) {}

  changeEmail(email: Email) {
    this.email = email;
  }
}
```

### Limitations:

Domain is NOT dependent on:

- NestJS
- TypeORM
- PostgreSQL
- Redis
- HTTP слоя

## 4.2 Application Layer (Use Cases)

Contains system use cases.

### Includes:
- Use Cases
- DTOs
- Application services

### Example structure:
```
application/
  use-cases/
  dto/
```

### Example Use Case:
```ts
export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDto) {
    const user = new User(...);

    await this.userRepository.save(user);
  }
}
```

### Responsibilities:
- business logic orchestration
- data flow management
- invoking domain objects

## 4.3 Infrastructure Layer

Implementation of external dependencies.

### Includes:
- PostgreSQL (TypeORM)
- Redis
- Email service
- Repository implementations

### Example structure:
```
infrastructure/
  database/
  repositories/
  cache/
  email/
```

### Example Repository:
```ts
export class TypeOrmUserRepository implements UserRepository {
  constructor(private ormRepo: Repository<UserEntity>) {}

  async save(user: User) {
    await this.ormRepo.save(user);
  }
}
```

## 4.4 Presentation Layer (NestJS)

The entry point to the system.

### Includes:
 - Controllers
 - WebSocket Gateways
 - Guards
 - Pipes

### Example structure:
```
presentation/
  controllers/
  gateways/
```

### Example Controller:
```ts
@Controller(‘auth’)
export class AuthController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post(‘register’)
  register(@Body() dto: RegisterUserDto) {
    return this.registerUser.execute(dto);
  }
}
```

# 5. Shared Module

Components shared between modules.

```
shared/
  domain/
    base/
    errors/

  infrastructure/
    logger/
    guards/
```
# 6. Main System Modules
### Auth
 - registration
 - login
 - JWT
 - refresh tokens
 - email verification

### User
 - user profile
 - settings

### Project
 - projects
 - members
 - project roles

### Task
 - tasks
 - statuses
 - deadlines
 - assignment

### Chat
 - WebSocket chats
 - rooms
 - messages
 - online status

### Notification
 - email notifications
 - real-time notifications

# 7. Module Interaction

### Modules interact via:
- interfaces (ports)
- dependency injection
- events (domain events — optional)

### Prohibited:
- direct import of another module’s infrastructure
- access to other modules’ ORM repositories
- tight coupling between modules

# 8. Request Flow (Example)
User registration:
```
HTTP Request
  ↓
Controller (Presentation)
  ↓
Use Case (Application)
  ↓
Domain Entity
  ↓
Repository Interface (Domain)
  ↓
Repository Implementation (Infrastructure)
  ↓
Database (PostgreSQL)
```