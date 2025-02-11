const VerifyEmail = (email: string, token: string) => {
  console.log("Template is creating...");
  return (
    <main className="p-10">
      <button
        style={{
          height: "2.5rem",
          backgroundColor: "black",
          paddingBlock: "0.5rem",
          paddingInline: "1rem",
          color: "white",
          borderRadius: "0.5rem",
        }}
        className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
      >
        <a
          style={{ textDecoration: "none", color: "white" }}
          href={`http://localhost:3000/auth/verify-email?token=${token}`}
        >
          Verify Account
        </a>
      </button>
    </main>
  );
};

export default VerifyEmail;
