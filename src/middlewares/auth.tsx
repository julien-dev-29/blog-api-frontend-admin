import { isAuthenticated } from "@/lib/auth";
import { redirect } from "react-router";

export function authMiddleware() {
  if (!isAuthenticated()) throw redirect("/auth");
}
