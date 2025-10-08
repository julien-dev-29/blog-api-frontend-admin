import { useEffect, useState } from "react";
import type { Post } from "../../../types/types";
import { NavLink } from "react-router";
import Pagination from "../../organisms/pagination";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error as string);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error.toString().length > 0) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error.toString()}</span>
      </div>
    );
  }

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="p-8 w-full flex-1">
      <h1 className="text-2xl">Posts</h1>
      <div className="text-right">
        <NavLink className="btn btn-primary" to="/create">
          Create a post
        </NavLink>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <th>{post.id}</th>
                  <td>{post.title}</td>
                  <td>{post.createdAt?.toString()}</td>
                  <td>
                    <NavLink
                      className="btn btn-primary"
                      to={`/posts/${post.id}`}
                    >
                      Edit
                    </NavLink>
                    <button className="btn btn-error mx-1">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-5">
        <Pagination numberOfPages={2} currentPage={1} />
      </div>
    </div>
  );
};

export default Posts;
