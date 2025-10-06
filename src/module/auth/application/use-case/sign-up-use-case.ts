import { UseCase } from "../../../common";
import { User } from "../../domain/entity/user";
import { UserAlreadyExistsError } from "../../error/user-already-exists-error";
import { UnitOfWorkAuth } from "../contract/unit-of-work-auth";

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkAuth: UnitOfWorkAuth) {}

  async execute(input: Input): Promise<void> {
    const user = await this.unitOfWorkAuth.execute(async ({ userRepository }) =>
      userRepository.getByEmail(input.email)
    );
    if (user) {
      throw new UserAlreadyExistsError();
    }
    const newUser = User.create({
      email: input.email,
      name: input.name,
      rawPassword: input.password,
      role: "admin",
    });
    await this.unitOfWorkAuth.execute(async ({ userRepository }) =>
      userRepository.create(newUser)
    );
  }
}

export type Input = {
  name: string;
  email: string;
  password: string;
};

export type Output = void;
