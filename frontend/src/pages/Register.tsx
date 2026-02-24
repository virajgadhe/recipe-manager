import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({ name, email, password });
    navigate("/login");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-16 space-y-4">
      <h2 className="text-xl font-bold">Register</h2>

      <input
        className="w-full p-2 border"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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
        Register
      </button>
    </form>
  );
}
