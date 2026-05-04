import React from 'react'

interface IconProps {
  size?: number
  className?: string
  color?: string
}

function iconStyle(size: number, color?: string): React.CSSProperties {
  return {
    width: size,
    height: size,
    flexShrink: 0,
    verticalAlign: 'middle',
    ...(color ? { color } : {}),
  }
}

// Building icon for studio venues
export const BuildingIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <path d="M9 22V18h6v4M8 6h.01M8 10h.01M12 6h.01M12 10h.01M16 6h.01M16 10h.01"/>
  </svg>
)

// Home service: house icon
export const HomeServiceIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V13h6v8"/>
  </svg>
)

// Verified shield badge
export const VerifiedIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M12 2l3 3.5L19 5l-1 4.5L21 12l-3 2.5L19 19l-4-.5L12 22l-3-3.5L5 19l1-4.5L3 12l3-2.5L5 5l4 .5L12 2z"/>
    <path d="M8 12l3 3 5-5"/>
  </svg>
)

// Calendar
export const CalendarIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

// User/Profile
export const UserIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
  </svg>
)

// Search
export const SearchIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.3-4.3"/>
  </svg>
)

// Location pin
export const LocationIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)

// Clock
export const ClockIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3"/>
  </svg>
)

// Star filled
export const StarFilledIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"
    style={iconStyle(size, color)} className={className}>
    <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2z"/>
  </svg>
)

// Star outline
export const StarIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2z"/>
  </svg>
)

// Wallet
export const WalletIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <path d="M1 8h22M17 13.5h.01"/>
  </svg>
)

// Ticket/Coupon
export const TicketIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M2 7a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V7z"/>
    <path d="M9 8v.01M9 12v.01M9 16v.01"/>
  </svg>
)

// Support/Help chat
export const SupportIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    <path d="M8 9h.01M12 9h.01M16 9h.01"/>
  </svg>
)

// Archive/Document
export const ArchiveIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    <path d="M8 7h6M8 11h8"/>
  </svg>
)

// Comment/Review
export const CommentIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
)

// Heart
export const HeartIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z"/>
  </svg>
)

// Settings/Gear
export const SettingsIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.7 1.7 0 00.3 1.7l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.7-.3 1.7 1.7 0 00-1 2.2v.1a2 2 0 01-4 0v-.1A1.7 1.7 0 008.8 19.4a1.7 1.7 0 00-1.7.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.7 1.7 1.7 0 00-2.2-1H2a2 2 0 010-4h.1a1.7 1.7 0 001.7-1 1.7 1.7 0 00-.3-1.7l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.7.3H8a1.7 1.7 0 001-2.2V2a2 2 0 014 0v.1a1.7 1.7 0 001 2.2 1.7 1.7 0 001.7-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.7v.1a1.7 1.7 0 002.2 1h.1a2 2 0 010 4h-.1a1.7 1.7 0 00-1.7 1z"/>
  </svg>
)

// Map pin
export const MapPinIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

// Sparkle/Feature
export const SparkleIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
    <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/>
    <path d="M18 16l.5 1.5L20 18l-1.5.5L18 20l-.5-1.5L16 18l1.5-.5L18 16z"/>
  </svg>
)

// Shield
export const ShieldIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M12 2l7 4v5c0 5.2-2.8 10-7 12-4.2-2-7-6.8-7-12V6l7-4z"/>
  </svg>
)

// Orders/Receipt
export const OrdersIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2H4z"/>
    <path d="M8 7h8M8 11h8M8 15h5"/>
  </svg>
)

// Address/Book
export const AddressIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    <path d="M12 6v6l3 2"/>
  </svg>
)

// Dumbbell/Fitness
export const DumbbellIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M7 7h10v10H7V7zM3 9V5a1 1 0 011-1h3v8H4a1 1 0 01-1-1zM21 9V5a1 1 0 00-1-1h-3v8h3a1 1 0 001-1z"/>
  </svg>
)

// Fire/Trending
export const FireIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M15 4c-3 4-4 7-4 10a5 5 0 0010 0c0-3-1-6-4-10"/>
    <path d="M9 8C7 10.7 6 13 6 15.5A5.5 5.5 0 0017 18"/>
  </svg>
)

// Check/Certified badge
export const CheckIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

// Add photo
export const PhotoIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="M21 15l-5-5L5 21"/>
  </svg>
)

// QR Code
export const QRIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="3" height="3" rx="0.5"/>
    <rect x="19" y="14" width="2" height="2"/>
    <rect x="14" y="19" width="2" height="2"/>
    <rect x="18" y="18" width="3" height="3" rx="0.5"/>
  </svg>
)

// Pilates/Core icon
export const PilatesIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v10M8 10c-2 1-3 3-3 6M16 10c2 1 3 3 3 6"/>
    <path d="M6 14h12"/>
  </svg>
)

// Arrow right
export const ArrowRightIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
)

// Chevron right
export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
)

// Play icon
export const PlayIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"
    style={iconStyle(size, color)} className={className}>
    <path d="M8 5v14l11-7z"/>
  </svg>
)

// Empty/inbox icon
export const InboxIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M22 12h-6l-2 3H10l-2-3H2"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
  </svg>
)

// Refresh icon
export const RefreshIcon: React.FC<IconProps> = ({ size = 24, className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" style={iconStyle(size, color)} className={className}>
    <path d="M1 4v6h6M23 20v-6h-6"/>
    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
  </svg>
)
