import { BaseRepository } from "../../../../common/application/contract/base-repository";
import { User } from "../../../domain/entity/user";

export interface UserRepository extends BaseRepository {
  getByEmail(email: string): Promise<User | undefined>;
  getById(id: string): Promise<User>;
  create(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  update(user: User): Promise<void>;
}
