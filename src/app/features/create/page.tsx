"use client";

import { useActionState } from "react";
import { createFeatureAction } from "./actions";

export default function CreateFeaturePage() {
  const [state, formAction, isPending] = useActionState(
    createFeatureAction,
    null,
  );

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Feature title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          disabled={isPending}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="markdown" className="mb-1 block text-sm font-medium">
          Markdown
        </label>
        <textarea
          id="markdown"
          name="markdown"
          rows={6}
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
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Creating…" : "Create feature"}
      </button>
    </form>
  );
}
