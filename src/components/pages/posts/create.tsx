import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import type { Post } from "../../../types/types";
import { getToken } from "../../../authentication/auth";

const Create = () => {
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
  });
  const [error, setError] = useState<Error>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        method: "POST",
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error(await res.json());
      console.log(res.json());

      navigate("/posts");
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">New Post</legend>
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
          Create
        </button>
        <NavLink to="/posts" className="btn btn-error">
          Annuler
        </NavLink>
      </fieldset>
    </div>
  );
};

export default Create;
