import { User } from "../../../domain/entity/user";
import { UnitOfWorkAuthMemory } from "../../../infra/repository/auth-unit-of-work-memory";
import { SessionMemoryRepository } from "../../../infra/repository/memory/session-memory-repository";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { SignInEmailPasswordUseCase } from "../sign-in-email-password-use-case";
import { Input, SignUpUseCase } from "../sign-up-use-case";

it("should not sign up if email already exists", async () => {
  const mockUser = User.create({
    email: "john@email.com",
    name: "john",
    rawPassword: "12345678",
    role: "admin",
  });
  const userRepository = new UserMemoryRepository([mockUser]);
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const signUpUseCase = new SignUpUseCase(
    unitOfWorkAuthMemory,
    signInEmailPasswordUseCase
  );
  const createUser = async () => {
    await signUpUseCase.execute({
      email: "john@email.com",
      name: "john",
      password: "12345678",
    });
  };
  expect(createUser).rejects.toThrow();
});

it("should not sign up with invalid parameters", async () => {
  const userRepository = new UserMemoryRepository();
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const signUpUseCase = new SignUpUseCase(
    unitOfWorkAuthMemory,
    signInEmailPasswordUseCase
  );
  const signUp = async () => await signUpUseCase.execute({} as Input);
  expect(signUp).rejects.toThrow();
});

it("should sign up", async () => {
  const userRepository = new UserMemoryRepository();
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const signUpUseCase = new SignUpUseCase(
    unitOfWorkAuthMemory,
    signInEmailPasswordUseCase
  );
  await signUpUseCase.execute({
    email: "john@email.com",
    name: "john",
    password: "12345678",
  });
  const createdUser = await userRepository.getByEmail("john@email.com");
  expect(createdUser).toBeDefined();
  expect(createdUser?.getEmail()).toEqual("john@email.com");
  expect(createdUser?.getName()).toEqual("john");
});
