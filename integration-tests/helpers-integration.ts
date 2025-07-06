async function makeLogin(): Promise<{ token: string }> {
  const response = await requester("auth/sign-in/email-password", "POST", {
    email: "johndoe@email.com",
    password: "123456",
  });
  return response.json();
}

export async function adminRequester(path: string, method: string, data?: any) {
  const { token } = await makeLogin();
  return await fetch(`http://127.0.0.1:3001/api/${path}`, {
    method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(data && { body: JSON.stringify(data) }),
  });
}

export async function userRequester(path: string, method: string, data?: any) {
  const { token } = await makeLogin();
  return await fetch(`http://127.0.0.1:3001/api/${path}`, {
    method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(data && { body: JSON.stringify(data) }),
  });
}

export async function requester(path: string, method: string, data?: any) {
  return await fetch(`http://127.0.0.1:3001/api/${path}`, {
    method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
