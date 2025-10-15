import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import MyPagination from "../organisms/my-pagination";
import { useNavigate } from "react-router";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";

type Post = {
  id: number;
  title: string;
};

export default function PostsLists() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchPosts = async (page: number) => {
    fetch("http://localhost:3000/api/posts?p=" + page)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setPage(data.page);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchPosts(page);
  }, [page]);

  async function handleDelete(postId: number) {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch("http://localhost:3000/api/posts/" + postId, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        toast.success("Posts delete with success!");
        await fetchPosts(page);
      } catch (error) {
        setError(error as string);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <Button className="mb-4" onClick={() => navigate("/posts/create")}>
        Create New Post
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No posts available.
              </TableCell>
            </TableRow>
          )}
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell className="flex gap-1">
                <Button onClick={() => navigate("/posts/" + post.id)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyPagination page={page} total={total} setPage={setPage} />
    </div>
  );
}
