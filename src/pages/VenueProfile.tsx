import { useNavigate, useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import SectionHeader from '../components/SectionHeader'
import { venues } from '../data/mock'

export default function VenueProfile() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const venue = venues.find((v) => v.id === Number(id))

  if (!venue) {
    return (
      <div style={s.page}>
        <div style={s.notFound}>
          <div style={s.notFoundEmoji}>🔍</div>
          <p style={s.notFoundText}>场馆未找到</p>
          <div style={s.backBtn} onClick={() => nav(-1)}>
            返回
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      {/* Hero */}
      <div
        style={{
          ...s.hero,
          backgroundImage: `url(${venue.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* NavBar */}
        <div style={s.navBar}>
          <div style={s.navBack} onClick={() => nav(-1)}>
            ←
          </div>
          <div style={s.navTitle}>{venue.name}</div>
          <div style={s.navPlaceholder} />
        </div>

        {/* Center (image background, no emoji) */}
        <div style={s.heroCenter} />

        {/* Verified badge */}
        {venue.verified && (
          <div style={s.verifiedBadge}>
            ✅ 平台认证场馆
          </div>
        )}
      </div>

      {/* Info Card */}
      <div style={s.card}>
        {/* Name + Rating + Location */}
        <div style={s.headerRow}>
          <h1 style={s.venueName}>{venue.name}</h1>
          <div style={s.ratingArea}>
            <StarRating value={venue.rating} size={14} />
            <span style={s.ratingText}>
              {venue.rating.toFixed(1)} ({venue.reviewCount})
            </span>
          </div>
        </div>

        <div style={s.locationRow}>
          <span style={s.locationTag}>{venue.district}</span>
          <span style={s.locationTag}>📍 {venue.distance}</span>
        </div>

        <div style={{ height: 14 }} />

        {/* Address */}
        <div style={s.infoRow}>
          <span style={s.infoIcon}>📍</span>
          <span style={s.infoText}>{venue.address}</span>
        </div>

        {/* Hours */}
        <div style={s.infoRow}>
          <span style={s.infoIcon}>🕐</span>
          <span style={s.infoText}>{venue.openHours}</span>
        </div>

        <div style={{ height: 16 }} />

        {/* Description */}
        <p style={s.description}>{venue.description}</p>

        <div style={{ height: 20 }} />

        {/* Facilities */}
        <SectionHeader title="🛠️ 场馆设施" />
        <div style={s.tagRow}>
          {venue.facilities.map((fac, idx) => (
            <span key={idx} style={s.tagChip}>
              {fac}
            </span>
          ))}
        </div>

        <div style={{ height: 18 }} />

        {/* Services */}
        <SectionHeader title="✨ 提供服务" />
        <div style={s.tagRow}>
          {venue.services.map((svc, idx) => (
            <span key={idx} style={s.svcChip}>
              ✅ {svc}
            </span>
          ))}
        </div>

        <div style={{ height: 18 }} />

        {/* Schedule label */}
        <div style={s.scheduleBox}>
          <span style={s.scheduleIcon}>📅</span>
          <span style={s.scheduleText}>{venue.scheduleLabel}</span>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: 30 }} />
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 12,
    padding: 20,
  },
  notFoundEmoji: {
    fontSize: 48,
    lineHeight: 1,
  },
  notFoundText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 500,
    margin: 0,
  },
  backBtn: {
    marginTop: 8,
    padding: '10px 28px',
    borderRadius: 24,
    background: '#E3617B',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  // Hero
  hero: {
    height: 200,
    background: 'linear-gradient(135deg, #E3617B, #444)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    paddingTop: 16,
  },
  navBack: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: 1,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  navPlaceholder: {
    width: 32,
  },
  heroCenter: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 56,
    lineHeight: 1,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    padding: '5px 12px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.25)',
    backdropFilter: 'blur(8px)',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 500,
  },

  // Card
  card: {
    background: '#FFFFFF',
    borderRadius: '20px 20px 0 0',
    marginTop: -16,
    padding: '20px 16px 0',
    position: 'relative',
    zIndex: 1,
    minHeight: 300,
  },

  // Header
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  venueName: {
    fontSize: 20,
    fontWeight: 700,
    color: '#222',
    margin: 0,
    lineHeight: 1.2,
  },
  ratingArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 2,
    flexShrink: 0,
  },
  ratingText: {
    fontSize: 11,
    color: '#6a6a6a',
  },
  locationRow: {
    display: 'flex',
    gap: 8,
    marginTop: 8,
  },
  locationTag: {
    fontSize: 11,
    color: '#E3617B',
    background: 'rgba(227,97,123,0.08)',
    padding: '3px 10px',
    borderRadius: 8,
    fontWeight: 500,
  },

  // Info rows
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    padding: '6px 0',
  },
  infoIcon: {
    fontSize: 14,
    lineHeight: 1.5,
    flexShrink: 0,
  },
  infoText: {
    fontSize: 13,
    color: '#222',
    lineHeight: 1.5,
  },

  // Description
  description: {
    fontSize: 13,
    color: '#222',
    lineHeight: 1.7,
    margin: 0,
  },

  // Tags
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    background: '#fff',
    color: '#222',
    fontWeight: 500,
  },
  svcChip: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    background: '#ddd',
    color: '#222',
    fontWeight: 500,
  },

  // Schedule
  scheduleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 16px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, rgba(227,97,123,0.06), rgba(212,74,101,0.04))',
  },
  scheduleIcon: {
    fontSize: 16,
    lineHeight: 1,
  },
  scheduleText: {
    fontSize: 13,
    fontWeight: 600,
    color: '#222',
  },
}
