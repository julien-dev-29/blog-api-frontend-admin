import type { User } from "@/types/types";

export function storeToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

export function storeUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null") as User | null;
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
