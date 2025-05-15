"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/lib/action";
import { motion, useInView } from "framer-motion";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function page() {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}
              {/* {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )} */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                {state?.errors?.password && (
                  <p className="text-red-500">{state.errors.password}</p>
                )}
                <div className="flex items-center">
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              {/* {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )} */}
              <LoginButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {/* mt-4 p-2 bg-[#147be2] rounded-md text-white w-full hover:bg-transparent hover:border transition-colors flex items-center justify-center gap-2 */}
      <Button
        aria-disabled={pending}
        type="submit"
        className="w-full bg-[#147be2] font-oswald text-xl text-white hover:bg-transparent hover:text-[#147be2] hover:border"
        disabled={pending}
      >
        {pending ? "Loading..." : "Login"}
      </Button>
    </motion.div>
  );
}
