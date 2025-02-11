"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { signUp } from "./actions";
import { useRouter } from "next/navigation";
import EmailVerificationCard from "@/components/verification-card";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    generic: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", generic: "" };

    if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await signUp(email, username);
      if (response?.error) {
        setErrors({ email: "", username: "", generic: response.message });
        return;
      }
      setShowVerification(true);
    }
  };

  // bg-gradient-to-r from-purple-400 via-pink-500 to-red-500

  if (showVerification) {
    return (
      <EmailVerificationCard
        email={email}
        key={email}
        onResendVerification={async () => {
          return new Promise((resolve) => setTimeout(resolve, 3000));
        }}
      />
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="username-error"
              />
              {errors.username && (
                <p id="username-error" className="text-sm text-red-500">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-600 ml-2">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
