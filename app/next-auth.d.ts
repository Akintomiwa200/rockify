import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "../types/auth"; // Import from `types/auth.d.ts`

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: UserRole; // Use imported UserRole for consistency
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface JWT {
    id: string;
    role: UserRole;
  }
}
