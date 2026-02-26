import { useEffect, useState } from 'react';
import { getProfile, updateProfile, changePassword } from '../api/user.api';
import type { User } from "../types/user";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setName(data.name);
      } catch {
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      await updateProfile(name);
      setMessage('Name updated successfully ✅');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handlePasswordChange = async () => {
    setError('');
    setMessage('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setMessage('Password updated successfully ✅');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {message && (
        <div className="p-2 text-green-700 bg-green-100 rounded">{message}</div>
      )}
      {error && (
        <div className="p-2 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          value={user.email}
          disabled
          className="w-full px-3 py-2 bg-gray-100 border rounded"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleUpdateName}
          className="px-4 py-2 mt-2 text-white bg-indigo-600 rounded"
        >
          Update Name
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <button
          onClick={handlePasswordChange}
          className="px-4 py-2 text-white bg-indigo-600 rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
