"use server";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { signInSchema } from "./zod";

const testUser = {
  id: 1,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

export async function login(prevState, formData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));
  console.log("formData", result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);
  redirect(`/en/admin/dashboard`);
}

export async function logout() {
  await deleteSession();
  redirect("/admin");
}
