import { Role } from './role.model';

export interface User {
  userId: number;
  userName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  role: Role;
}
