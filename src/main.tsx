import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors />
  </>
);
