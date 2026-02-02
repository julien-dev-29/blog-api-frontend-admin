// components/tags/tags-create.tsx
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreateTag } from "@/hooks/useCreateTag";

export default function TagsCreate() {
  const {
    tag,
    isLoading,
    errors,
    handleNameChange,
    handleSubmit,
  } = useCreateTag();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create a Tag</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={tag.name}
            onChange={handleNameChange}
          />
          {errors?.fieldErrors.name?.[0] && (
            <p className="text-red-500 text-sm">
              {errors.fieldErrors.name?.[0]}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}