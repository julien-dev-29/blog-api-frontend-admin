// components/posts/posts-create.tsx
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TipTapEditor } from "../tiptap-editor";
import { useState, type FormEvent } from "react";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router"; // Pour la redirection après soumission

type Post = {
  title: string;
  content: string;
  slug: string;
};

export default function PostsCreate() {
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    slug: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Pour rediriger après la création du post

  // Génère le slug automatiquement à partir du titre
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const newSlug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setPost({ ...post, title: newTitle, slug: newSlug });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
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

      // Affichage d'un toast de succès
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Créer un Post</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            required
            value={post.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            required
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Contenu</Label>
          <TipTapEditor
            initialContent={post.content}
            onChange={(content) => setPost({ ...post, content })}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Publication en cours..." : "Publier"}
        </Button>
      </form>
    </div>
  );
}
