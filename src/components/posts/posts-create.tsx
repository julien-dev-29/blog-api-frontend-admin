// components/posts/posts-create.tsx
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreatePost } from "@/hooks/useCreatePost";
import PostEditor from "../md-editor/md-editor";

export default function PostsCreate() {
  const {
    post,
    isLoading,
    errors,
    handleTitleChange,
    generateSlug,
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
          {errors?.fieldErrors.title?.[0] && (
            <p className="text-red-500 text-sm">
              {errors.fieldErrors.title?.[0]}
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
          {errors?.fieldErrors.slug?.[0] && (
            <p className="text-red-500 text-sm">
              {errors.fieldErrors.slug?.[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Content</Label>
          <div className="shadow rounded">
            <PostEditor post={post} setPost={setPost} />
          </div>
          {errors?.fieldErrors.content?.[0] && (
            <p className="text-red-500 text-sm">
              {errors.fieldErrors.content?.[0]}
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
