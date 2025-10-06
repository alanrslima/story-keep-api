import { UseCase } from "../../../common";
import { Session } from "../../domain/entity/session";
import { InvalidCredentialsError } from "../../error/invalid-credentials-error";
import { UnitOfWorkAuth } from "../contract/unit-of-work-auth";

export class SignInEmailPasswordUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkAuth: UnitOfWorkAuth) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.unitOfWorkAuth.execute(({ userRepository }) =>
      userRepository.getByEmail(input.email)
    );
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const session = Session.createWithPassword({
      rawPassword: input.password,
      user,
    });
    await this.unitOfWorkAuth.execute(({ sessionRepository }) =>
      sessionRepository.create(session)
    );
    return { token: session.getToken() };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = { token: string };
