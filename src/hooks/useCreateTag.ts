// hooks/useCreateTag.ts
import { useState, FormEvent } from "react";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { z } from "zod";

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export function useCreateTag() {
  const [tag, setTag] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodError | null>(null);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setTag({ ...tag, name: newName });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    const result = tagSchema.safeParse(tag);
    if (!result.success) {
      setErrors(result.error);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(tag),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création du tag");
      }

      toast.success(data.message || "Tag créé avec succès !");

      navigate("/tags");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tag,
    isLoading,
    errors,
    handleNameChange,
    handleSubmit,
  };
}
