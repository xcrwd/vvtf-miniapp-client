type DebugProps = {
  value?: unknown;
};

export function Debug({ value }: DebugProps) {
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}
