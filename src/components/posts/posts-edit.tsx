import { getToken } from "@/lib/auth";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TipTapEditor } from "../editor/tiptap-editor";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";

type Post = {
  title: string;
  content: string;
  slug: string;
};

export default function PostsEdit() {
  const params = useParams();
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    slug: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function fetchPost(postId: number) {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/posts/" + postId);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPost(Number(params.id));
  }, [params.id]);

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
      const response = await fetch(
        "http://localhost:3000/api/posts/" + params.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(post),
        }
      );

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

  if (isLoading) return <Spinner />;

  if (error.length > 0) return;
  <Alert variant="destructive">
    <AlertCircleIcon />
    <AlertTitle>Unable to process your payment.</AlertTitle>
    <AlertDescription>
      <p>Please verify your billing information and try again.</p>
      <ul className="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </AlertDescription>
  </Alert>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create a Post</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
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
          <Label>Content</Label>
          <div className="shadow rounded">
            <TipTapEditor
              initialContent={post.content}
              onChange={(content) => setPost({ ...post, content })}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Publication en cours..." : "Publier"}
        </Button>
      </form>
    </div>
  );
}
