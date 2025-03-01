import { User } from "../../../domain/entity/user";
import { InvalidCredentialsError } from "../../../error/invalid-credentials-error";
import { SessionMemoryRepository } from "../../../infra/repository/session-memory-repository";
import { UserMemoryRepository } from "../../../infra/repository/user-memory-repository";
import { SignInEmailPasswordUseCase } from "../sign-in-email-password-use-case";

it("should make sign in with email and password and create a session", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    rawPassword: "12345678",
    role: "admin",
  });
  user.approve();
  const sessionMemoryRepository = new SessionMemoryRepository();
  const userMemoryRepository = new UserMemoryRepository([user]);
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const response = await signInEmailPasswordUseCase.execute({
    email: "johndoe@email.com",
    password: "12345678",
  });
  expect(response.token).toBeDefined();
  expect(sessionMemoryRepository.getData()).toHaveLength(1);
  expect(sessionMemoryRepository.getData()[0].getToken()).toEqual(
    response.token
  );
  expect(sessionMemoryRepository.getData()[0].getClientId()).toEqual(
    user.getId()
  );
});

it("should not make sign in if the user does not exists", async () => {
  const sessionMemoryRepository = new SessionMemoryRepository();
  const userMemoryRepository = new UserMemoryRepository();
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    userMemoryRepository,
    sessionMemoryRepository
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
  const sessionMemoryRepository = new SessionMemoryRepository();
  const userMemoryRepository = new UserMemoryRepository([user]);
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    userMemoryRepository,
    sessionMemoryRepository
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
  const sessionMemoryRepository = new SessionMemoryRepository();
  const userMemoryRepository = new UserMemoryRepository([user]);
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const execute = async () =>
    await signInEmailPasswordUseCase.execute({
      email: "johndoe_wrong@email.com",
      password: "12345678",
    });
  expect(execute).rejects.toThrow(InvalidCredentialsError);
});
