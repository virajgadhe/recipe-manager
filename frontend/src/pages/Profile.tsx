import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../api/user.api";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data: User = await getProfile();
        setUser(data);
        setName(data.name);
      } catch {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleUpdateName = async () => {
    if (!name.trim()) return;

    setError("");
    setMessage("");
    setSavingName(true);

    try {
      await updateProfile(name);
      setMessage("Name updated successfully ✅");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSavingName(false);
    }
  };

  const handlePasswordChange = async () => {
    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSavingPassword(true);

    try {
      await changePassword(currentPassword, newPassword);
      setMessage("Password updated successfully ");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen px-6 bg-gray-50 py-14">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-gray-500">
            Manage your account information and security.
          </p>
        </div>

        {/* Alerts */}
        {message && (
          <div className="px-4 py-3 text-sm text-green-700 border border-green-200 bg-green-50 rounded-xl">
            {message}
          </div>
        )}

        {error && (
          <div className="px-4 py-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl">
            {error}
          </div>
        )}

        {/* Account Info Card */}
        <div className="p-6 space-y-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-gray-500"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            onClick={handleUpdateName}
            disabled={savingName}
            className="px-5 py-2.5 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {savingName ? "Updating..." : "Update Name"}
          </button>
        </div>

        {/* Change Password Card */}
        <div className="p-6 space-y-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="New password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            onClick={handlePasswordChange}
            disabled={savingPassword}
            className="px-5 py-2.5 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {savingPassword ? "Updating..." : "Change Password"}
          </button>
        </div>

      </div>
    </div>
  );
}
