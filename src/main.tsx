import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Posts from "./components/pages/posts/posts.tsx";
import Create from "./components/pages/posts/create.tsx";
import Login from "./components/pages/login.tsx";
import Edit from "./components/pages/posts/edit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:postId",
        element: <Edit />,
      },
      {
        path: "/create",
        element: <Create />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
