import { LoginForm } from "../login-form";

export default function Login() {
  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    // Perform login logic here (e.g., authenticate user)
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });
    if (!res.ok) {
        throw new Error("Failed to login");
    }
    const result = await res.json();
    console.log("Login successful:", result);
    // You can redirect or show a success message after login
    return { success: true };
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={(e) => handleSubmit(e)} />
      </div>
    </div>
  );
}
