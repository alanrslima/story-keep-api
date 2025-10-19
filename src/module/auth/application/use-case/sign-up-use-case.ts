import { UseCase } from "../../../common";
import { User } from "../../domain/entity/user";
import { UserAlreadyExistsError } from "../../error/user-already-exists-error";
import { UnitOfWorkAuth } from "../contract/unit-of-work-auth";
import { SignInEmailPasswordUseCase } from "./sign-in-email-password-use-case";

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly unitOfWorkAuth: UnitOfWorkAuth,
    private readonly signInEmailPasswordUseCase: SignInEmailPasswordUseCase
  ) {}

  async execute(input: Input): Promise<Output> {
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
      role: "user",
    });
    await this.unitOfWorkAuth.execute(async ({ userRepository }) =>
      userRepository.create(newUser)
    );
    const response = await this.signInEmailPasswordUseCase.execute({
      email: input.email,
      password: input.password,
    });
    return { token: response.token };
  }
}

export type Input = {
  name: string;
  email: string;
  password: string;
};

export type Output = { token: string };
