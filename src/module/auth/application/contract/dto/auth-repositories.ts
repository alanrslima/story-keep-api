import { SessionRepository } from "../repository/session-repository";
import { UserRepository } from "../repository/user-repository";

export interface AuthRepositories {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
}
