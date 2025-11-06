export interface User {
  id?: number;
  fullname: string;
  email: string;
  phone?: string;
  title?: string;
  password?: string;
  passwordConfirm?: string;
  role: string;
  permission: string;
  status: boolean;
  entreprise: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  id?: number;
  fullname: string;
  email: string;
  phone?: string;
  title?: string;
  role: string;
  permission: string;
  status: boolean;
  entreprise: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPaginate {
  id?: number;
  fullname: string;
  email: string;
  phone?: string;
  title?: string;
  role: string;
  permission: string;
  status: boolean;
  entreprise: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Login {
  email: string;
  password: string;
  entreprise?: string;
}

export interface RegisterInput {
  fullname: string;
  email: string;
  phone?: string;
  title?: string;
  password: string;
  passwordConfirm: string;
  role: string;
  permission: string;
  status?: boolean;
  entreprise: string;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: UserResponse;
  };
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  total_pages: number;
  page: number;
  page_size: number;
  length: number;
}

export interface UpdateUserInput {
  fullname?: string;
  phone?: string;
  title?: string;
  entreprise?: string;
  role?: string;
  permission?: string;
  status?: boolean;
}

export interface ChangePasswordInput {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

// Enums pour les constantes
export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
  MODERATOR = 'Moderator'
}

export enum UserPermission {
  ALL = 'ALL',
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE'
}