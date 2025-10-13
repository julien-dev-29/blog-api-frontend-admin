import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import PostsLists from "./components/posts/posts-list.tsx";
import PostsCreate from "./components/posts/posts-create.tsx";
import Login from "./components/auth/login.tsx";
import Home from "./components/home/index.tsx";
import { Toaster } from "sonner";
import { authMiddleware } from "./middlewares/auth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    middleware: [authMiddleware],
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "posts",
        children: [
          { index: true, Component: PostsLists },
          { path: "create", Component: PostsCreate },
          { path: ":id/edit", Component: PostsCreate },
        ],
      },
    ],
  },
  { path: "auth", Component: Login },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors />
  </>
);
