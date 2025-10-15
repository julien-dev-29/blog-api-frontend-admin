import type { Category } from "@/types/types";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "../ui/input";
import { Terminal } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { getToken } from "@/lib/auth";

export default function CategoriesEdit() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category>({
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/categories/" + id);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setCategory(data);
        setIsLoading(false);
      } catch (error) {
        setError(error as string);
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/categories/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        method: "PUT",
        body: JSON.stringify({ name: category.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIsLoading(false);
      navigate("/categories");
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  }
  if (isLoading)
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex-1 h-full flex items-center">
        <Alert variant="destructive">
          <Terminal />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      </div>
    );
  return (
    <div className="p-5">
      <h1 className="mb-4">
        Edit: <span className="text-primary">{category.name}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                name="name"
                id="name"
                value={category.name}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                required
              />
            </Field>
          </FieldSet>
        </FieldGroup>
        <Button className="mt-3" type="submit">
          Edit
        </Button>
      </form>
    </div>
  );
}
