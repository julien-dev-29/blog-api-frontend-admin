import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import type { ReactNode } from "react";

export default function MyAlert({ children }: { children?: ReactNode }) {
  return (
    <Alert variant="destructive">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
