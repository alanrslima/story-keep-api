import { SessionRepository } from "../../application/contract/repository/session-repository";
import { Session } from "../../domain/entity/session";
import { SessionNotFoundError } from "../../error/session-not-found-error";

export class SessionMemoryRepository implements SessionRepository {
  private data: Session[];

  constructor(mock?: Session[]) {
    this.data = mock || [];
  }

  async create(session: Session): Promise<void> {
    this.data.push(session);
  }

  async getByToken(token: string): Promise<Session> {
    const session = this.data.find((item) => item.getToken() === token);
    if (!session) {
      throw new SessionNotFoundError();
    }
    return session;
  }

  async deleteExpired(): Promise<void> {
    this.data.filter((item) => item.getExpiresAt() <= new Date());
  }

  async deleteById(id: string): Promise<void> {
    this.data = this.data.filter((item) => item.getId() !== id);
  }

  getData() {
    return this.data;
  }
}
