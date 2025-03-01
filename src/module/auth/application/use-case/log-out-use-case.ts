import { UseCase } from "../../../common";
import { SessionRepository } from "../contract/repository/session-repository";

export class LogOutUseCase implements UseCase<Input, Output> {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(input: Input): Promise<Output> {
    await this.sessionRepository.deleteById(input.session.id);
  }
}

type Input = {
  session: { id: string };
};

type Output = void;
