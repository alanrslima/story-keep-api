import { User } from '../../../domain/entity/user';

export interface UserRepository {
  getByEmail(email: string): Promise<User | undefined>;
  getById(id: string): Promise<User>;
  create(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  update(user: User): Promise<void>;
}
