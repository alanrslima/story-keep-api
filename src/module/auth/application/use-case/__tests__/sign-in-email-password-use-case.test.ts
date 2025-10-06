import { User } from "../../../domain/entity/user";
import { InvalidCredentialsError } from "../../../error/invalid-credentials-error";
import { UnitOfWorkAuthMemory } from "../../../infra/repository/auth-unit-of-work-memory";
import { SessionMemoryRepository } from "../../../infra/repository/memory/session-memory-repository";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { SignInEmailPasswordUseCase } from "../sign-in-email-password-use-case";

it("should make sign in with email and password and create a session", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    rawPassword: "12345678",
    role: "admin",
  });
  user.approve();
  const userRepository = new UserMemoryRepository([user]);
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });

  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const response = await signInEmailPasswordUseCase.execute({
    email: "johndoe@email.com",
    password: "12345678",
  });
  expect(response.token).toBeDefined();
  expect(sessionRepository.getData()).toHaveLength(1);
  expect(sessionRepository.getData()[0].getToken()).toEqual(response.token);
  expect(sessionRepository.getData()[0].getuserId()).toEqual(user.getId());
});

it("should not make sign in if the user does not exists", async () => {
  const userRepository = new UserMemoryRepository();
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const execute = async () =>
    await signInEmailPasswordUseCase.execute({
      email: "johndoe@email.com",
      password: "12345678",
    });
  expect(execute).rejects.toThrow(InvalidCredentialsError);
});

it("should not make sign in if the password is wrong", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    rawPassword: "12345678",
    role: "admin",
  });
  const userRepository = new UserMemoryRepository([user]);
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const execute = async () =>
    await signInEmailPasswordUseCase.execute({
      email: "johndoe@email.com",
      password: "wrong_password",
    });
  expect(execute).rejects.toThrow(InvalidCredentialsError);
});

it("should not make sign in if the email is wrong", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    rawPassword: "12345678",
    role: "admin",
  });
  const userRepository = new UserMemoryRepository([user]);
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    unitOfWorkAuthMemory
  );
  const execute = async () =>
    await signInEmailPasswordUseCase.execute({
      email: "johndoe_wrong@email.com",
      password: "12345678",
    });
  expect(execute).rejects.toThrow(InvalidCredentialsError);
});
