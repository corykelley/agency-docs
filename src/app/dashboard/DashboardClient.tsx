"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createWebsiteAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

type Website = {
  id: number;
  createdAt: Date;
  name: string;
  slug: string;
  url: string;
};

type DashboardClientProps = {
  websites: Website[];
};

export default function DashboardClient({ websites }: DashboardClientProps) {
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createWebsiteAction,
    null,
  );

  return (
    <>
      <nav className="py-12">
        <ul className="flex flex-row gap-x-6">
          <li>
            <Button
              type="button"
              onClick={() => setShowCreateCard((prev) => !prev)}
            >
              Create New Site
            </Button>
          </li>
        </ul>
      </nav>

      {websites.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Your sites</h2>
          <ul className="flex flex-col gap-3">
            {websites.map((site) => (
              <li key={site.id}>
                <Link
                  href={`/sites/${site.slug}`}
                  className="block rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">{site.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {site.url}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showCreateCard && (
        <div className="w-full max-w-md mx-auto mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Website</CardTitle>
              <CardAction
                className="cursor-pointer"
                onClick={() => setShowCreateCard((prev) => !prev)}
              >
                <X />
              </CardAction>
            </CardHeader>
            <CardContent>
              <form
                action={formAction}
                className="flex max-w-md flex-col gap-4 mx-auto py-12"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium"
                  >
                    Website name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isPending}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="url"
                    className="mb-1 block text-sm font-medium"
                  >
                    Website URL
                  </label>
                  <input
                    id="url"
                    name="url"
                    type="url"
                    required
                    disabled={isPending}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                {state?.error && (
                  <p className="text-sm text-red-600" role="alert">
                    {state.error}
                  </p>
                )}
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating…" : "Create website"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
