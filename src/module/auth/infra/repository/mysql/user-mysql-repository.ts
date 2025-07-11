import { MysqlDataSource } from "../../../../common";
import { UserRepository } from "../../../application/contract/repository/user-repository";
import { User } from "../../../domain/entity/user";
import { UserNotFoundError } from "../../../error/user-not-found-error";

export class UserMysqlRepository implements UserRepository {
  private dataSource = MysqlDataSource.getInstance();

  async create(user: User): Promise<void> {
    const sql = `INSERT INTO user (id, name, email, password, salt, role, status, is_first_login) VALUES (?,?,?,?,?,?,?,?)`;
    await this.dataSource.query(sql, [
      user.getId(),
      user.getName(),
      user.getEmail(),
      user.getPassword()?.getHash(),
      user.getPassword()?.getSalt(),
      user.getRole(),
      user.getStatus(),
      user.getIsFirstLogin(),
    ]);
  }

  async update(user: User): Promise<void> {
    const sql = `UPDATE user SET name = ?, email = ?, role = ?, is_first_login = ? WHERE id = ?`;
    await this.dataSource.query(sql, [
      user.getName(),
      user.getEmail(),
      user.getRole(),
      user.getIsFirstLogin(),
      user.getId(),
    ]);
  }

  async getById(id: string): Promise<User> {
    const sql = `SELECT id, name, email, password, salt, role, status, is_first_login FROM user WHERE id = ?`;
    const response = await this.dataSource.query(sql, [id]);
    if (!response.length) {
      throw new UserNotFoundError();
    }
    const [data] = response;
    return User.build({
      email: data.email,
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
    const sql = `SELECT id, name, email, password, salt, role, status, is_first_login FROM user WHERE email = ?`;
    const response = await this.dataSource.query(sql, [email]);
    if (response.length) {
      const [data] = response;
      return User.build({
        email: data.email,
        id: data.id,
        name: data.name,
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
    await this.dataSource.query(sql, [user.getId()]);
  }
}
