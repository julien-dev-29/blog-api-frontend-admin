import { useState } from "react";
import { storeToken, storeUser } from "../../authentication/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      storeToken(data.token);
      storeUser(data.user);
      setLoading(false);
      navigate("/posts");
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
          <span>{error.toString()}</span>
        </div>
      )}
      <legend className="fieldset-legend">Login</legend>

      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        className="input"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        className="input"
        name="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="btn btn-neutral mt-4">
        Login
      </button>
    </fieldset>
  );
};

export default Login;
