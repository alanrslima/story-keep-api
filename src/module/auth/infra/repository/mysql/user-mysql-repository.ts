import { EntityManager, QueryRunner } from "typeorm";
import { UserRepository } from "../../../application/contract/repository/user-repository";
import { User } from "../../../domain/entity/user";
import { UserNotFoundError } from "../../../error/user-not-found-error";

export class UserMysqlRepository implements UserRepository {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  setManager(manager: EntityManager): void {
    this.manager = manager;
  }

  async create(user: User): Promise<void> {
    const sql = `INSERT INTO user (id, name, email, profile_url, password, salt, role, status, is_first_login) VALUES (?,?,?,?,?,?,?,?,?)`;
    await this.manager.query(sql, [
      user.getId(),
      user.getName(),
      user.getEmail(),
      user.getProfileUrl(),
      user.getPassword()?.getHash(),
      user.getPassword()?.getSalt(),
      user.getRole(),
      user.getStatus(),
      user.getIsFirstLogin(),
    ]);
  }

  async update(user: User): Promise<void> {
    const sql = `UPDATE user SET name = ?, email = ?, profile_url = ?, role = ?, is_first_login = ? WHERE id = ?`;
    await this.manager.query(sql, [
      user.getName(),
      user.getEmail(),
      user.getProfileUrl(),
      user.getRole(),
      user.getIsFirstLogin(),
      user.getId(),
    ]);
  }

  async getById(id: string): Promise<User> {
    const sql = `SELECT id, name, email, profile_url, password, salt, role, status, is_first_login FROM user WHERE id = ?`;
    const response = await this.manager.query(sql, [id]);
    if (!response.length) {
      throw new UserNotFoundError();
    }
    const [data] = response;
    return User.build({
      email: data.email,
      profileUrl: data.profile_url,
      id: data.id,
      name: data.name,
      password: data.password,
      salt: data.salt,
      role: data.role,
      status: data.status,
      isFirstLogin: Boolean(data.is_first_login),
    });
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const sql = `SELECT id, name, email, profile_url, password, salt, role, status, is_first_login FROM user WHERE email = ?`;
    const response = await this.manager.query(sql, [email]);
    if (response.length) {
      const [data] = response;
      return User.build({
        email: data.email,
        id: data.id,
        name: data.name,
        profileUrl: data.profile_url,
        password: data.password,
        salt: data.salt,
        role: data.role,
        status: data.status,
        isFirstLogin: Boolean(data.is_first_login),
      });
    }
    return undefined;
  }

  async delete(user: User): Promise<void> {
    const sql = `DELETE FROM user WHERE id = ?`;
    await this.manager.query(sql, [user.getId()]);
  }
}
