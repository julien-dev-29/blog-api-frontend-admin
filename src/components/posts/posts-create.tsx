// components/posts/posts-create.tsx
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TipTapEditor } from "../editor/tiptap-editor";
import { useCreatePost } from "@/hooks/useCreatePost";

export default function PostsCreate() {
  const {
    post,
    isLoading,
    errors,
    handleTitleChange,
    generateSlug,
    handleContentChange,
    handleSubmit,
    setPost,
  } = useCreatePost();

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
          {errors?.formErrors.fieldErrors.title && (
            <p className="text-red-500 text-sm">
              {errors.formErrors.fieldErrors.title}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="slug">Slug</Label>
          <div className="flex items-center gap-2">
            <Input
              id="slug"
              required
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
            />
            <Button type="button" onClick={generateSlug}>
              Generate
            </Button>
          </div>
          {errors?.formErrors.fieldErrors.slug && (
            <p className="text-red-500 text-sm">
              {errors.formErrors.fieldErrors.slug}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Content</Label>
          <div className="shadow rounded">
            <TipTapEditor
              content={post.content}
              onChange={handleContentChange}
            />
          </div>
          {errors?.formErrors.fieldErrors.content && (
            <p className="text-red-500 text-sm">
              {errors.formErrors.fieldErrors.content}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  );
}
