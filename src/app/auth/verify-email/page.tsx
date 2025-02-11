import { Button } from "@/components/ui/button";
import db from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// for every page , we will be passed with an object that contains params, searchParams, and other fields so we can access them in our page directly on the server side
export default async function VerifyEmail({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams["token"];
  console.log("Token: ", token);
  if (!token) {
    return redirect("/auth/login");
  }
  const tokenData = await db.verificationTokens.findUnique({
    where: { token: token as string },
  });

  const user = await db.user.findUnique({ where: { id: tokenData?.userId } });
  const session = await db.session.create({
    data: { userId: user?.id as any },
  });

  const cookie = await cookies();
  cookie.set("sessionId", session.id);
  const tokenVerified = !!tokenData;

  return (
    <main className="max-w-6xl p-20 flex items-center justify-center">
      <div>
        <Button>{tokenVerified ? "Email Verified" : "Invalid Tiken"}</Button>
      </div>
    </main>
  );
}
