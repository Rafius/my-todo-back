import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserRepository } from '../../domain/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { UserEmail } from '../../domain/UserEmail';
import { UserCreatedAt } from '../../domain/UserCreatedAt';
import { UserName } from '../../domain/UserName';
import { UserNotFoundError } from '../../domain/UserNotFoundError';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  private mapToDomain(u: TypeOrmUserEntity) {
    return new User(
      new UserId(u.id),
      new UserName(u.name),
      new UserEmail(u.email),
      new UserCreatedAt(u.createdAt),
    );
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id: id.value,
      },
    });

    if (!user) throw new UserNotFoundError('El usuario no existe');

    return this.mapToDomain(user);
  }

  async create(user: User): Promise<void> {
    await this.repository.save({
      id: user.id.value,
      name: user.id.value,
      email: user.id.value,
      createdAt: user.id.value,
    });
  }

  async edit(user: User): Promise<void> {
    await this.repository.update(user.id.value, {
      id: user.id.value,
      name: user.id.value,
      email: user.id.value,
      createdAt: user.id.value,
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
