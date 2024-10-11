type DebugProps = {
  value?: unknown;
  className?: string;
};

export function Debug({ value, className }: DebugProps) {
  return <pre className={className}>{JSON.stringify(value, null, 2)}</pre>;
}
