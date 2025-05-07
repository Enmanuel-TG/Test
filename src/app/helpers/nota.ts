export const getAllNotas = async () => {
  try {
    const response = await fetch("/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching notas:", error);
  }
};

export const createNota = async (title: string, content: string) => {
  const body = {
    title,
    content,
  };
  const res = await fetch("/api/dashboard", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
};

export const deleteNota = async (id: string) => {
  const body = { id };
  const res = await fetch("/api/dashboard", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
    const data = await res.json();
  console.log(data);
  return {}
};
