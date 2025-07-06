async function makeLogin(): Promise<{ token: string }> {
  const body = { password: "Naveg@", username: "Navega4133_00" };
  const response = await fetch("http://127.0.0.1:3001/api/auth/signin", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function loggedRequester(
  path: string,
  method: string,
  data?: any
) {
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
