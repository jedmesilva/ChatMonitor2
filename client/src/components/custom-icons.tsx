interface IconProps {
  size?: number;
  className?: string;
}

export const OdometerIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="5" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="8" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="11" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="14" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="17" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
  </svg>
);

export const FuelPumpIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 20V6C4 4.89543 4.89543 4 6 4H12C13.1046 4 14 4.89543 14 6V11H16L18 13V18H16V20" 
      stroke="currentColor" 
      strokeWidth="2"
      fill="none"
    />
    <path d="M4 8H14" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 15H18" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="6" width="6" height="2" fill="currentColor"/>
  </svg>
);

interface FuelTankIconProps extends IconProps {
  level?: number;
}

export const FuelTankIcon = ({ size = 24, className = "", level = 0.6 }: FuelTankIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="6" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect 
      x="7" 
      y={6 + (13 * (1 - level))} 
      width="10" 
      height={13 * level} 
      rx="1" 
      fill="currentColor"
      opacity="0.3"
    />
    <rect x="18" y="10" width="2" height="4" rx="1" fill="currentColor"/>
    <path d="M18 12H20" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="13" r="1" fill="currentColor"/>
  </svg>
);
