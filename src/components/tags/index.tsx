import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { Tag } from "@/types/types";
import { Spinner } from "../ui/spinner";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import MyPagination from "../organisms/my-pagination";
import { getToken } from "@/lib/auth";
import MyAlert from "../my-components/my-alert";
import { toast } from "sonner";

const TagsList = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const fetchTags = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tags?p=" + page);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTags(data.tags);
      setTotal(data.total);
      setPage(data.page);
      setIsLoading(false);
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags(page);
  }, [page]);

  async function handleDelete(id: number) {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch("http://localhost:3000/api/tags/" + id, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        toast.success(data.message);
        fetchTags(page);
      } catch (error) {
        setError(error as string);
      }
    }
  }

  if (isLoading)
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error.length > 0)
    return (
      <div className="flex-1 h-full flex items-center">
        <MyAlert>{error}</MyAlert>
      </div>
    );

  return (
    <div className="p-5">
      <Button className="mb-4" onClick={() => navigate("/tags/create")}>
        Create New Tag
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.id}</TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell className="space-x-1">
                <Button>
                  <NavLink to={"/tags/" + tag.id}>Edit</NavLink>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(tag.id as number)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyPagination total={total} page={page} setPage={setPage} />
    </div>
  );
};

export default TagsList;
