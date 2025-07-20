"use server";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { signInSchema } from "./zod";

const adminUser = {
  id: 1,
  email: process.env.EMAIL,  // Changed from EMAIL to ADMIN_EMAIL for clarity
  password: process.env.PASSWORD,  // Changed from PASSWORD to ADMIN_PASSWORD
  isAdmin: true  // Explicit admin flag
};

export async function login(prevState, formData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== adminUser.email || password !== adminUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
        password: ["Invalid email or password"],
      },
    };
  }

  // Create session with admin flag
  await createSession({
    userId: adminUser.id,
    isAdmin: true,
    email: adminUser.email
  });
  
  redirect(`/en/admin/dashboard`);
}

export async function logout() {
  await deleteSession();
  redirect("/admin");
}