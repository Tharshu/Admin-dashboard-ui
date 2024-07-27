import { Role } from './role.model';

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  role: Role;
}
