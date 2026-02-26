import { http } from "./http";

export const getProfile = () =>
  http("/api/auth/me", { auth: true });

export const updateProfile = (name: string) =>
  http("/api/users/me", {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ name }),
  });

export const changePassword = (
  currentPassword: string,
  newPassword: string
) =>
  http("/api/users/me/password", {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ currentPassword, newPassword }),
  });
