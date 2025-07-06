import { requester } from "../helpers-integration";

it("should sign up and sign in with email and password", async () => {
  const signUpResponse = await requester("auth/sign-up", "POST", {
    email: "bob@email.com",
    password: "123456",
    name: "Bob Dilan",
  });
  expect(signUpResponse.status).toEqual(201);
  const sigInResponse = await requester("auth/sign-in/email-password", "POST", {
    email: "bob@email.com",
    password: "123456",
  });
  expect(sigInResponse.status).toEqual(200);
  const sigInData = await sigInResponse.json();
  expect(sigInData.token).toBeDefined();
});
