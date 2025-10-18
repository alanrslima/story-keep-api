import { Session } from "../../../domain/entity/session";
import { User } from "../../../domain/entity/user";
import { NotAuthorizedError } from "../../../error/not-authorized-error";
import { UnitOfWorkAuthMemory } from "../../../infra/repository/auth-unit-of-work-memory";
import { SessionMemoryRepository } from "../../../infra/repository/memory/session-memory-repository";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { AuthMiddleware } from "../auth-middleware";

it("should throw an error if not token provided", async () => {
  const userRepository = new UserMemoryRepository();
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const authMiddleware = new AuthMiddleware(unitOfWorkAuthMemory);

  const handle = async () => await authMiddleware.handle({});
  expect(handle).rejects.toThrow(NotAuthorizedError);
});

it("should throw an error if the token are invalid", async () => {
  const userRepository = new UserMemoryRepository();
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const authMiddleware = new AuthMiddleware(unitOfWorkAuthMemory);
  const handle = async () =>
    await authMiddleware.handle({ authorization: "invalid_token" });
  expect(handle).rejects.toThrow(NotAuthorizedError);
});

it("should throw an error if the token are valid but the user are not registered", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
  });
  const session = Session.createWithoutPassword({ user });

  const userRepository = new UserMemoryRepository();
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const authMiddleware = new AuthMiddleware(unitOfWorkAuthMemory);
  const handle = async () =>
    await authMiddleware.handle({
      authorization: `Bearer ${session.getToken()}`,
    });
  expect(handle).rejects.toThrow(NotAuthorizedError);
});

it("should return user data if the token are valid and the user is registered", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
  });
  user.approve();
  const session = Session.createWithoutPassword({ user });
  const userRepository = new UserMemoryRepository([user]);
  const sessionRepository = new SessionMemoryRepository();
  const unitOfWorkAuthMemory = new UnitOfWorkAuthMemory({
    sessionRepository,
    userRepository,
  });
  const authMiddleware = new AuthMiddleware(unitOfWorkAuthMemory);
  const response = await authMiddleware.handle({
    authorization: `Bearer ${session.getToken()}`,
  });
  expect(response.statusCode).toEqual(200);
  expect(response.body.session).toBeDefined();
  expect(response.body.session.user.id).toEqual(user.getId());
  expect(response.body.session.user.permissions).toEqual(user.getPermissions());
});
