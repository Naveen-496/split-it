"use client";

import { useState } from "react";
import { signIn } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (email) {
      const response = await signIn(email.trim());
      if (response.error) {
        setError(response.message);
        return;
      }
      setError("");
      router.replace("/");
    }
  };
  //  bg-gradient-to-r from-blue-100 to-purple-100
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-2">
            <Input
              className="w-full"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <Button className="w-full" onClick={onSubmit}>
            Verify Email
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Don't have an account?
          </div>
          <Link href="/auth/sign-up" className="w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
