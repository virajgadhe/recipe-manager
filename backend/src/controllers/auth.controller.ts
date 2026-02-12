import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { JWT_SECRET } from '../config/env';
import { AuthRequest } from '../middlewares/auth.middleware';

/**
 * POST /api/auth/register
 * Registers a new user with hashed password
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch {
    return res.status(500).json({
      message: 'Failed to register user',
    });
  }
};

/**
 * POST /api/auth/login
 * Logs in user and returns JWT token
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch {
    return res.status(500).json({
      message: 'Login failed',
    });
  }
};

/**
 * POST /api/auth/logout
 * Stateless logout (client deletes token)
 */
export const logout = async (_req: Request, res: Response) => {
  return res.json({
    message: 'Logged out successfully',
  });
};

/**
 * GET /api/auth/me
 * Returns currently authenticated user
 */
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch {
    return res.status(500).json({
      message: 'Failed to fetch user',
    });
  }
};
