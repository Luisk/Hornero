export function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="8"
        r="2.75"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M4.25 18.25c.55-2.55 2.5-4 4.75-4s4.2 1.45 4.75 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        cx="16.25"
        cy="8.25"
        r="2.35"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M15.15 14.35c1.85.2 3.4 1.4 3.95 3.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
