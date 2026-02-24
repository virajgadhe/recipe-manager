import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import registerImage from '../assets/register.jpg';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      await register({ name, email, password });

      navigate('/login');
    } catch {
      setError('Registration failed. Try again.');
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
          src={registerImage}
          alt="Cooking preparation"
          className="object-cover w-full h-full"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-700/80 via-purple-700/70 to-indigo-700/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h2 className="text-5xl font-bold leading-tight">
            Your kitchen,
            <br />
            perfectly organized.
          </h2>

          <p className="max-w-md mt-6 text-lg text-violet-100">
            Join thousands of home cooks managing recipes, planning meals, and
            creating delicious memories.
          </p>

          <div className="mt-10 space-y-3 text-violet-100">
            <p>✔ Save unlimited recipes</p>
            <p>✔ Smart ingredient tracking</p>
            <p>✔ Plan meals effortlessly</p>
          </div>
        </div>
      </div>
      
      {/* RIGHT FORM */}
      <div className="flex items-center justify-center flex-1 px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-500">
            Start organizing recipes in seconds.
          </p>

          {error && (
            <div className="p-3 mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
              {error}
            </div>
          )}

          <div className="p-8 mt-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

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
                  placeholder="Minimum 8 characters"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 transition disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
