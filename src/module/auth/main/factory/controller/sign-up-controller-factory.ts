import { Controller } from "../../../../common";
import { SignUpUseCase } from "../../../application/use-case/sign-up-use-case";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { SignUpController } from "../../../presentation/controller/sign-up-controller";

export const signUpControllerFactory = (): Controller => {
  const userRepository = new UserMemoryRepository();
  const signUpUseCase = new SignUpUseCase(userRepository);
  const controller = new SignUpController(signUpUseCase);
  return controller;
};
