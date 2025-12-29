// hooks/useCreatePost.ts
import { useState, FormEvent } from "react";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
});

export function useCreatePost() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    slug: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodError | null>(null);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPost({ ...post, title: newTitle });
  };

  const generateSlug = () => {
    const newSlug = post.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setPost({ ...post, slug: newSlug });
  };

  const handleContentChange = (content: string) => {
    setPost({ ...post, content });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    const result = postSchema.safeParse(post);
    if (!result.success) {
      setErrors(result.error);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création du post");
      }

      toast.success(data.message || "Post créé avec succès !");

      navigate("/posts");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    post,
    isLoading,
    errors,
    handleTitleChange,
    generateSlug,
    handleContentChange,
    handleSubmit,
    setPost,
  };
}
