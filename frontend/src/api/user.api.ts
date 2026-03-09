import { http } from "./http";
import type { User } from "../types/user";

/**
 * Get current user profile
 */
export const getProfile = () =>
  http<User>("/auth/me", { auth: true });

/**
 * Update user name
 */
export const updateProfile = (name: string) =>
  http<User>("/users/me", {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ name }),
  });

/**
 * Change password
 */
export const changePassword = (
  currentPassword: string,
  newPassword: string
) =>
  http<{ message: string }>("/users/me/password", {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ currentPassword, newPassword }),
  });
