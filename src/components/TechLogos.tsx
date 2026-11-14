import type { SVGProps } from 'react';

export type TechName = 'dotnet' | 'csharp' | 'sql' | 'mongo' | 'react' | 'angular' | 'node' | 'express';

type LogoProps = SVGProps<SVGSVGElement> & { tech: TechName };

const logoColors: Record<TechName, string> = {
  dotnet: '#512bd4',
  csharp: '#9b4f96',
  sql: '#00a4ef',
  mongo: '#47a248',
  react: '#61dafb',
  angular: '#dd0031',
  node: '#8cc84b',
  express: '#f2f4f6',
};

export function TechLogo({ tech, ...props }: LogoProps) {
  const color = logoColors[tech];
  return (
    <svg viewBox="0 0 48 48" fill="none" role="img" aria-label={`${tech} technology logo`} {...props}>
      {tech === 'dotnet' && <><path d="M24 4 41.32 14v20L24 44 6.68 34V14L24 4Z" fill={color}/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">.NET</text></>}
      {tech === 'csharp' && <><path d="M24 3 42.2 13.5v21L24 45 5.8 34.5v-21L24 3Z" fill={color}/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">C#</text></>}
      {tech === 'sql' && <><path d="M11 10c0-3 5.8-5.5 13-5.5S37 7 37 10v28c0 3-5.8 5.5-13 5.5S11 41 11 38V10Z" fill={color}/><ellipse cx="24" cy="10" rx="13" ry="5.5" fill="#0078d4"/><path d="M15 20c4.7 3.1 13.3 3.1 18 0M15 29c4.7 3.1 13.3 3.1 18 0" stroke="white" strokeOpacity=".7" strokeWidth="1.5"/><text x="24" y="38" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">SQL</text></>}
      {tech === 'mongo' && <><path d="M24 3c-2 7-8 11-8 20 0 8 3.6 13.4 8 18 4.4-4.6 8-10 8-18 0-9-6-13-8-20Z" fill={color}/><path d="M24 17v24" stroke="white" strokeOpacity=".7" strokeWidth="1.5"/></>}
      {tech === 'react' && <><circle cx="24" cy="24" r="3.5" fill={color}/><ellipse cx="24" cy="24" rx="19" ry="7" stroke={color} strokeWidth="2"/><ellipse cx="24" cy="24" rx="19" ry="7" transform="rotate(60 24 24)" stroke={color} strokeWidth="2"/><ellipse cx="24" cy="24" rx="19" ry="7" transform="rotate(120 24 24)" stroke={color} strokeWidth="2"/></>}
      {tech === 'angular' && <><path d="m24 4 18 6-2.8 23.5L24 43 8.8 33.5 6 10l18-6Z" fill={color}/><path d="m24 10-9 22h4l1.8-5h6.4l1.8 5h4L24 10Zm0 7 2.1 6h-4.2l2.1-6Z" fill="white"/></>}
      {tech === 'node' && <><path d="M24 4 41.3 14v20L24 44 6.7 34V14L24 4Z" fill={color}/><path d="M19 19v11l5 3 5-3V18l-5-3-5 3Z" stroke="#1e3a1e" strokeWidth="2"/><path d="M24 18v12" stroke="#1e3a1e" strokeWidth="2"/></>}
      {tech === 'express' && <><rect x="4" y="10" width="40" height="28" rx="5" fill="#24292f" stroke="#6b7280"/><path d="M10 17h4l2 4 2-4h4l-4 7 4 7h-4l-2-4-2 4h-4l4-7-4-7Zm15 0h10v3h-6v2h5v3h-5v3h6v3H25V17Z" fill={color}/></>}
    </svg>
  );
}

export const techLogoList: { name: string; tech: TechName }[] = [
  { name: '.NET Core', tech: 'dotnet' },
  { name: 'C#', tech: 'csharp' },
  { name: 'MS SQL Server', tech: 'sql' },
  { name: 'MongoDB', tech: 'mongo' },
  { name: 'React', tech: 'react' },
  { name: 'Angular', tech: 'angular' },
  { name: 'Node.js', tech: 'node' },
  { name: 'Express', tech: 'express' },
];
