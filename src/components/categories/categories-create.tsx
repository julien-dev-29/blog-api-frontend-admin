import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { getToken } from "@/lib/auth";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

type Category = {
  name: string;
};

export default function CategoriesCreate() {
  const [category, setCategory] = useState<Category>({
    name: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        method: "POST",
        body: JSON.stringify({ category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Category created with success!")
      navigate("/categories?p=1")
    } catch (error) {
      setError(error as string);
    }
  };
  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Name</FieldLabel>
                <Input
                  required
                  name="name"
                  value={category.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                  placeholder="News, tech..."
                />
                <FieldError>{error}</FieldError>
              </Field>
            </FieldGroup>
            <Field orientation="horizontal">
              <Button type="submit">Create</Button>
              <Button variant="outline">
                <NavLink to="/categories">Cancel</NavLink>
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
