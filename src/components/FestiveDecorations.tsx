import React from 'react';

export const DiyaLamp: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className = '' }) => {
  const dimensions = {
    sm: { w: 24, h: 22 },
    md: { w: 34, h: 30 },
    lg: { w: 46, h: 42 },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Diya Flame */}
      <div className="relative -mb-1 z-10">
        <div className="flame-glow w-3 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-100 rounded-full blur-[0.5px]" />
        <div className="absolute inset-0 w-1.5 h-3 m-auto bg-white rounded-full opacity-80" />
      </div>

      {/* Brass Lamp Base */}
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M2 14C2 22 12 28 24 28C36 28 46 22 46 14C46 12 40 12 36 14C30 16 18 16 12 14C8 12 2 12 2 14Z"
          fill="url(#brass-grad)"
          stroke="#9A6B1F"
          strokeWidth="1.5"
        />
        <ellipse cx="24" cy="14" rx="20" ry="4" fill="#C58F2C" />
        <ellipse cx="24" cy="13" rx="17" ry="2.5" fill="#E6AC3C" />
        <path d="M20 28H28V31H20V28Z" fill="#9A6B1F" />
        <defs>
          <linearGradient id="brass-grad" x1="2" y1="12" x2="46" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D061" />
            <stop offset="0.4" stopColor="#E6AC3C" />
            <stop offset="0.8" stopColor="#B37C1C" />
            <stop offset="1" stopColor="#7A5210" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const MarigoldFlower: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <circle cx="16" cy="16" r="14" fill="#FFA000" opacity="0.4" />
    <circle cx="16" cy="16" r="11" fill="#FF8F00" />
    <circle cx="16" cy="16" r="7" fill="#FF6F00" />
    <circle cx="16" cy="16" r="3.5" fill="#FFD54F" />
    {/* Petal details */}
    <path d="M16 3C17 7 15 7 16 3ZM16 29C17 25 15 25 16 29ZM3 16C7 17 7 15 3 16ZM29 16C25 17 25 15 29 16Z" stroke="#E65100" strokeWidth="1" />
  </svg>
);

export const AuspiciousCorner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2 38V6C2 3.79086 3.79086 2 6 2H38"
      stroke="#D4AF37"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M6 34V10C6 7.79086 7.79086 6 10 6H34"
      stroke="#E65100"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="12" cy="12" r="3" fill="#D4AF37" />
    <circle cx="2" cy="38" r="2" fill="#D4AF37" />
    <circle cx="38" cy="2" r="2" fill="#D4AF37" />
  </svg>
);

export const ModakIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M16 3C16 3 9 12 9 20C9 25 12 28 16 28C20 28 23 25 23 20C23 12 16 3 16 3Z"
      fill="url(#modak-grad)"
      stroke="#C58F2C"
      strokeWidth="1.5"
    />
    <path d="M16 5V27M12 11C13 16 13 22 13 26M20 11C19 16 19 22 19 26" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
    <defs>
      <linearGradient id="modak-grad" x1="16" y1="3" x2="16" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF8E7" />
        <stop offset="0.6" stopColor="#FFE082" />
        <stop offset="1" stopColor="#FFCA28" />
      </linearGradient>
    </defs>
  </svg>
);

export const SocietyEmblem: React.FC<{
  preset?: string;
  customLogoUrl?: string;
  size?: number;
  className?: string;
}> = ({ preset = 'society_crest', customLogoUrl, size = 52, className = '' }) => {
  if (customLogoUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full p-1 bg-gradient-to-tr from-[#B37C1C] via-[#FFD54F] to-[#7A5210] shadow-md flex items-center justify-center overflow-hidden bg-white ${className}`}
      >
        <img
          src={customLogoUrl}
          alt="Society Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-full bg-white"
        />
      </div>
    );
  }

  // Preset vector badges
  if (preset === 'business_shield') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="32" cy="32" r="30" fill="url(#crest-bg)" stroke="#D4AF37" strokeWidth="2.5" />
        <path d="M32 12L46 18V32C46 41 39 49 32 52C25 49 18 41 18 32V18L32 12Z" fill="#8D181B" stroke="#F5D061" strokeWidth="1.5" />
        <path d="M32 20L35.5 27L43 28L37.5 33L39 40L32 36.5L25 40L26.5 33L21 28L28.5 27L32 20Z" fill="#FFD54F" stroke="#B8860B" strokeWidth="0.8" />
        <defs>
          <radialGradient id="crest-bg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(30)">
            <stop stopColor="#FFF9E6" />
            <stop offset="1" stopColor="#FFE082" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (preset === 'royal_seal') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="32" cy="32" r="30" fill="url(#crest-bg-gold)" stroke="#B71C1C" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="25" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M32 15C32 15 23 23 23 31C23 36 27 40 32 40C37 40 41 36 41 31C41 23 32 15 32 15Z" fill="#E65100" stroke="#FFD54F" strokeWidth="1.2" />
        <circle cx="32" cy="46" r="3" fill="#B71C1C" />
        <defs>
          <radialGradient id="crest-bg-gold" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(30)">
            <stop stopColor="#FFFDF7" />
            <stop offset="1" stopColor="#FFECB3" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (preset === 'om_mandala') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="32" cy="32" r="30" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="26" stroke="#E65100" strokeWidth="1" />
        <text x="32" y="39" textAnchor="middle" fontSize="24" fill="#B71C1C" fontWeight="bold" fontFamily="serif">ॐ</text>
      </svg>
    );
  }

  // Default: society_crest (Housing Society Crest)
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="30" fill="#FFF9E6" stroke="#D4AF37" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="26" stroke="#B8860B" strokeWidth="1" strokeDasharray="2 2" />
      {/* Housing complex buildings */}
      <rect x="22" y="24" width="10" height="24" rx="1" fill="#B71C1C" stroke="#F5D061" strokeWidth="0.8" />
      <rect x="32" y="18" width="10" height="30" rx="1" fill="#7A0E12" stroke="#F5D061" strokeWidth="0.8" />
      <rect x="16" y="32" width="8" height="16" rx="1" fill="#9C1C22" stroke="#F5D061" strokeWidth="0.8" />
      <rect x="42" y="30" width="7" height="18" rx="1" fill="#B71C1C" stroke="#F5D061" strokeWidth="0.8" />
      {/* Building Windows */}
      <circle cx="27" cy="28" r="1" fill="#FFE082" />
      <circle cx="27" cy="32" r="1" fill="#FFE082" />
      <circle cx="27" cy="36" r="1" fill="#FFE082" />
      <circle cx="37" cy="22" r="1" fill="#FFE082" />
      <circle cx="37" cy="26" r="1" fill="#FFE082" />
      <circle cx="37" cy="30" r="1" fill="#FFE082" />
      <circle cx="37" cy="34" r="1" fill="#FFE082" />
      {/* Kalash on top */}
      <path d="M37 14C37 12 35 12 35 14C35 16 39 16 39 14Z" fill="#E65100" />
      {/* Gold Laurel Ribbon */}
      <path d="M12 44C16 52 48 52 52 44" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

