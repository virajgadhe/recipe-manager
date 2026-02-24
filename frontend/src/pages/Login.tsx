import { useState } from 'react';
import { login, getMe } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/login.jpg';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      await login({ email, password });
      const user = await getMe();
      setUser(user);

      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT PANEL WITH IMAGE */}
      <div className="relative hidden lg:flex lg:w-1/2">
        {/* Background Image */}
        <img
          src={loginImage}
          alt="Cooking ingredients"
          className="object-cover w-full h-full"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/80 via-purple-700/70 to-violet-700/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h2 className="text-5xl font-bold leading-tight">
            Cook smarter,
            <br />
            not harder.
          </h2>

          <p className="max-w-md mt-6 text-lg text-indigo-100">
            Organize your recipes, plan meals, and bring creativity to your
            kitchen.
          </p>

          <div className="mt-10 space-y-3 text-indigo-100">
            <p>✔ Save unlimited recipes</p>
            <p>✔ Plan weekly meals</p>
            <p>✔ Manage ingredients easily</p>
          </div>
        </div>
      </div>
      {/* RIGHT FORM */}
      <div className="flex items-center justify-center flex-1 px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-500">Sign in to continue</p>

          {error && (
            <div className="p-3 mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
              {error}
            </div>
          )}

          <div className="p-8 mt-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 transition disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            {/* Register link */}
            <p className="mt-6 text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
