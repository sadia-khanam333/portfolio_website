import type { SVGProps } from 'react';

export function UpworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 5.5h2.6v7.6c0 1.9 1.3 3.1 3.1 3.1s3.1-1.2 3.1-3.1V5.5h2.6v7.6c0 3.3-2.4 5.6-5.7 5.6S4.5 16.4 4.5 13.1V5.5Z" />
      <circle cx="18.2" cy="15.6" r="2.3" />
    </svg>
  );
}

export function FiverrIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <text x="12" y="16" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="sans-serif">fi</text>
    </svg>
  );
}
