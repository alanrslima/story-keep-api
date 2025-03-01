import { UseCase } from "../../../common";
import { User } from "../../domain/entity/user";
import { UserAlreadyExistsError } from "../../error/user-already-exists-error";
import { UserRepository } from "../contract/repository/user-repository";

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.getByEmail(input.email);
    if (user) {
      throw new UserAlreadyExistsError();
    }
    const newUser = User.create({
      email: input.email,
      name: input.name,
      rawPassword: input.password,
      role: "admin",
    });
    await this.userRepository.create(newUser);
  }
}

export type Input = {
  name: string;
  email: string;
  password: string;
};

export type Output = void;
