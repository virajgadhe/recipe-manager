import { useState } from "react";
import { login, getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext"; // ✅ correct for you
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ email, password });
    const user = await getMe();

    setUser(user);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-16 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>

      <input
        className="w-full p-2 border"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 border"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full px-4 py-2 text-white bg-green-600">
        Login
      </button>
    </form>
  );
}
