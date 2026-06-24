type CountryCode = 'IL' | 'US';
type FlagIconSize = 'sm' | 'md' | 'lg';

const FLAG_GLYPHS: Record<CountryCode, string> = {
  IL: '🇮🇱',
  US: '🇺🇸',
};

type FlagIconProps = {
  countryCode: CountryCode;
  label: string;
  decorative?: boolean;
  className?: string;
  size?: FlagIconSize;
};

export default function FlagIcon({ countryCode, label, decorative = false, className = '', size = 'md' }: FlagIconProps) {
  return (
    <span
      className={['flag-icon', `flag-icon--${size}`, className].filter(Boolean).join(' ')}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : 'img'}
    >
      {FLAG_GLYPHS[countryCode]}
    </span>
  );
}
