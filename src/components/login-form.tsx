import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "./ui/spinner";
import MyAlert from "./my-components/my-alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  async function handleLogin() {
    setIsLoading(true);
    try {
      // 1. Appel à l'API de login
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }
      const data = await response.json();
      // 2. Stockage du token et des infos utilisateur dans localStorage
      localStorage.setItem("token", data.token); // Supposons que ton API renvoie un token
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  if (error.length > 0) {
    return (
      <div className="flex-1 h-full flex items-center">
        <MyAlert>{error}</MyAlert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button onClick={handleLogin}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
