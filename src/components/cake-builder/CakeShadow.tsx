export function CakeShadow({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`cake-shadow${compact ? " is-exploded" : ""}`}
      aria-hidden="true"
    />
  );
}
