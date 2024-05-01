// src/types/next-auth.d.ts

interface Session extends DefaultSession {
  user: {
    uid: string;
    email: string;
    role: string;
    status: string;
  };
}
