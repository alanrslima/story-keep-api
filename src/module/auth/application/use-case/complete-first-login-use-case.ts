import { UseCase } from "../../../common";
import { UnitOfWorkAuth } from "../contract/unit-of-work-auth";

export class CompleteFirstLoginUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkAuth: UnitOfWorkAuth) {}

  async execute(input: Input): Promise<void> {
    const user = await this.unitOfWorkAuth.execute(async ({ userRepository }) =>
      userRepository.getById(input.userId)
    );
    user.setIsFirstLogin(false);
    await this.unitOfWorkAuth.execute(async ({ userRepository }) =>
      userRepository.update(user)
    );
  }
}

export type Input = {
  userId: string;
};

export type Output = void;
