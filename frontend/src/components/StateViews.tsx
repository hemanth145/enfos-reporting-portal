import type { ReactNode } from "react";

/** Shared shell so every state (loading/empty/error) is centered and consistent. */
function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
      {children}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <Panel>
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600"
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-slate-500">{label}</p>
    </Panel>
  );
}

export function EmptyState({
  title = "Nothing to show",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <Panel>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
        📭
      </div>
      <h3 className="text-base font-semibold text-slate-700">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500">{message}</p>
    </Panel>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <Panel>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
        ⚠️
      </div>
      <h3 className="text-base font-semibold text-slate-700">
        Something went wrong
      </h3>
      <p className="max-w-sm text-sm text-slate-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          Try again
        </button>
      )}
    </Panel>
  );
}
