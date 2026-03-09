"use client";

import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "@/lib/auth/client";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      social={{
        providers: ["google"],
      }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
