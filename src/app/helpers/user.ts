interface Props {
  email: string;
  password: string;
}

export const createUser = async (
  email: string,
  password: string
): Promise<{ status: number; data: Props }> => {
  const body = { email, password };
  const res = await fetch("/api/user/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return { status: res.status, data };
};


export const loginUser = async (
  email: string,
  password: string
): Promise<{ status: number; data: Props }> => {
  const body = { email, password };
  const res = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return { status: res.status, data };
};
