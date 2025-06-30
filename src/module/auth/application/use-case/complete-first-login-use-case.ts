import { UseCase } from "../../../common";
import { UserRepository } from "../contract/repository/user-repository";

export class CompleteFirstLoginUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.getById(input.userId);
    user.setIsFirstLogin(false);
    await this.userRepository.update(user);
  }
}

export type Input = {
  userId: string;
};

export type Output = void;
