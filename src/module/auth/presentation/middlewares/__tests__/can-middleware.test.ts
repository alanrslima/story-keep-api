import { ForbiddenError } from "../../../error/forbidden-error";
import { AuthMiddlewareSession, CanMiddleware } from "../can-middleware";

it("should return ok if user has permissions", async () => {
  const canMiddleware = new CanMiddleware(["role.create"]);
  const response = await canMiddleware.handle({
    session: {
      id: "2",
      clientId: "123",
      clientType: "user",
      permissions: ["role.update", "role.create"],
    },
  });
  expect(response.statusCode).toEqual(200);
});

it("should return throw an error if the user does not have a role", () => {
  const canMiddleware = new CanMiddleware(["role.create"]);
  const handle = async () => {
    await canMiddleware.handle({
      session: {
        id: "2",
        clientId: "123",
        clientType: "user",
      } as AuthMiddlewareSession,
    });
  };
  expect(handle).rejects.toThrow(ForbiddenError);
});

it("should throw an error if user does not have the required permissions", async () => {
  const canMiddleware = new CanMiddleware(["role.create"]);
  expect(
    async () =>
      await canMiddleware.handle({
        session: {
          id: "2",
          clientId: "123",
          clientType: "user",
          permissions: ["role.update"],
        },
      })
  ).rejects.toThrow(ForbiddenError);
});
