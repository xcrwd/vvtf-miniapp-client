export function ErrorFallback({ error }: { error: unknown }) {
  const fmt =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : JSON.stringify(error);

  return (
    <>
      <p>An unhandled error occurred:</p>
      <pre>{fmt}</pre>
    </>
  );
}
