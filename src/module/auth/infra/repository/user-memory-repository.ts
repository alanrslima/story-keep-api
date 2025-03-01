import { UserRepository } from "../../application/contract/repository/user-repository";
import { User } from "../../domain/entity/user";
import { UserNotFoundError } from "../../error/user-not-found-error";

export class UserMemoryRepository implements UserRepository {
  private data: User[];

  constructor(mock?: User[]) {
    this.data = mock || [];
  }

  async create(user: User): Promise<void> {
    this.data.push(user);
  }

  async delete(user: User): Promise<void> {
    this.data = this.data.filter((item) => item.getId() !== user.getId());
  }

  async getById(id: string): Promise<User> {
    const user = this.data.find((user) => user.getId() === id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async update(user: User): Promise<void> {
    this.data = this.data.map((item) =>
      item.getId() === user.getId() ? user : item
    );
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.data.find((user) => user.getEmail() === email);
  }

  getData() {
    return this.data;
  }
}
