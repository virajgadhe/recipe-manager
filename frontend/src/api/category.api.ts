import type { Category } from '../types/category';
import { http } from './http';

export function fetchCategories(): Promise<Category[]> {
  return http<Category[]>('/api/categories');
}
