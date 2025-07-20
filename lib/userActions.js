"use server";
import { clearAuthCookie } from "./auth";
import { redirect } from "next/navigation";

export async function userLogout() {
  await clearAuthCookie();
  redirect("/signin");
}