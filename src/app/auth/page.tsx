"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, loginUser } from "../helpers/user";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  const [state, setState] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-4">
      {state ? (
        <AuthForm
          type="register"
          onSubmit={async (email, password) => {
            const res = await createUser(email, password);
            if (res.status === 200) {
              router.push("/dashboard");
            }
          }}
        />
      ) : (
        <AuthForm
          type="login"
          onSubmit={async (email, password) => {
            const res = await loginUser(email, password);
            if (res.status === 200) {
              router.push("/dashboard");
            }
          }}
        />
      )}

      <button
        onClick={() => {
          setState(!state);
        }}
        className="block mx-auto px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Change Auth
      </button>
    </div>
  );
}
