"use client";

import { useActionState } from "react";
import { createFeatureAction } from "@/app/sites/[slug]/features/create/actions";

type FeatureFormAction = (
  prev: { error?: string } | null,
  formData: FormData,
) => Promise<{ error?: string } | null>;

type FeatureFormProps = {
  siteId: number;
  siteSlug: string;
  featureId?: number;
  featureData?: {
    title: string;
    markdown: string;
  };
  action?: FeatureFormAction;
};

export default function FeatureForm({
  siteId,
  siteSlug,
  featureId,
  featureData,
  action,
}: FeatureFormProps) {
  const [state, formAction, isPending] = useActionState(
    action ?? createFeatureAction,
    null,
  );

  const isEdit = featureId != null;

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="siteId" value={siteId} />
      <input type="hidden" name="siteSlug" value={siteSlug} />
      {isEdit && (
        <input type="hidden" name="featureId" value={featureId} />
      )}

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
          defaultValue={featureData?.title}
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
          defaultValue={featureData?.markdown}
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
        {isPending
          ? isEdit
            ? "Updating…"
            : "Creating…"
          : isEdit
            ? "Update feature"
            : "Create feature"}
      </button>
    </form>
  );
}
