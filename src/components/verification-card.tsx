"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailVerificationCardProps {
  email: string;
  onResendVerification: () => Promise<void>;
}

export default function EmailVerificationCard({
  email,
  onResendVerification,
}: EmailVerificationCardProps) {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await onResendVerification();
    setIsResending(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <Mail className="h-12 w-12 text-blue-500 animate-bounce" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Check Your Email
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          We've sent a verification email to:
        </p>
        <p className="font-medium text-lg">{email}</p>
        <p className="text-sm text-muted-foreground">
          Please check your inbox and click on the verification link to complete
          your registration.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={isResending}
          className="w-full"
        >
          {isResending ? "Resending..." : "Resend Verification Email"}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Didn't receive the email? Check your spam folder or try resending the
          verification email.
        </p>
      </CardFooter>
    </Card>
  );
}
