import type { User } from "../types/types";

export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const storeUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const userConnected = () => {
  return localStorage.getItem("user") ?? false;
};

export const getUser = () => {
  return localStorage.getItem("user");
};
