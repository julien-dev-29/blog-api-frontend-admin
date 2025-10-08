import { useEffect, useState } from "react";
import type { Post } from "../../../types/types";
import { data, NavLink, useNavigate, useParams } from "react-router";
import { getToken } from "../../../authentication/auth";

const Edit = () => {
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        if (!res.ok) throw new Error(await res.json());
        const data = await res.json();
        setPost(data);
        setIsloading(false)
      } catch (error) {
        setError(error as Error);
        setIsloading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(post),
      });
    } catch (error) {}
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit {post?.title}</legend>
        {error && (
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
            <span>Error! Task failed successfully.</span>
          </div>
        )}
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="input"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />

        <label className="label" htmlFor="title">
          Content
        </label>
        <textarea
          className="textarea"
          name="content"
          id="content"
          placeholder="content"
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        ></textarea>

        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Edit
        </button>
        <NavLink to="/posts" className="btn btn-error">
          Annuler
        </NavLink>
      </fieldset>
    </div>
  );
};

export default Edit;
