import { Session } from '../../../domain/entity/session';

export interface SessionRepository {
  create(session: Session): Promise<void>;
  getByToken(token: string): Promise<Session>;
  deleteExpired(): Promise<void>;
  deleteById(id: string): Promise<void>;
}
