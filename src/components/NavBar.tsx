"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@neondatabase/neon-js/auth/react/ui";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <header>
      <nav className="w-full border-b py-4 backdrop-blur">
        <div className="container mx-auto flex flex-row items-center justify-between gap-4">
          <Link href="/" className="font-semibold">
            AgencyDocs
          </Link>

          <ul className="flex flex-row items-center gap-x-4 text-sm">
            <li>
              <Link href="/features">All Features</Link>
            </li>
            <SignedIn>
              <li>
                <Link href="/features/create">Create Feature</Link>
              </li>
            </SignedIn>
          </ul>

          <div className="flex items-center gap-2">
            <SignedOut>
              <Button asChild size="sm" variant="ghost">
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <UserButton size="icon" />
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}
