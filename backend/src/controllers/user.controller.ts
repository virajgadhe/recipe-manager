import { Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

/**
 * PUT /api/users/me
 * Update user name
 */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        message: 'Name must be at least 2 characters',
      });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name: name.trim() },
      select: { id: true, name: true, email: true },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

/**
 * PUT /api/users/me/password
 * Change user password
 */
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Both passwords are required',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({
        message: 'Current password is incorrect',
      });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    res.json({ message: 'Password updated successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to update password' });
  }
};
