import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {
  const dispatch = useDispatch()
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)

  const addToCollection = () => {
    dispatch(addCollection(item))
    dispatch(addedToast())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <article
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHovered : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={item.title || 'Media item'}
    >
      {/* Media */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.mediaLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.type === 'photo' ? (
          <img
            style={styles.media}
            src={item.src}
            alt={item.title || ''}
            loading="lazy"
          />
        ) : (
          <video
            style={styles.media}
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </a>

      {/* Type badge */}
      <span style={styles.badge} aria-label={item.type}>
        {item.type === 'video' ? '▶' : '⬛'}
      </span>

      {/* Bottom overlay — gradient + info + CTA */}
      <div
        style={{
          ...styles.overlay,
          ...(hovered ? styles.overlayVisible : {}),
        }}
        aria-hidden="false"
      >
        <div style={styles.overlayInner}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.titleLink}
          >
            <h3 style={styles.title}>
              {item.title || 'Untitled'}
            </h3>
          </a>
          <button
            onClick={addToCollection}
            disabled={saved}
            aria-label={saved ? 'Saved' : 'Save to collection'}
            style={{
              ...styles.saveBtn,
              ...(saved ? styles.saveBtnSaved : {}),
            }}
            onMouseEnter={(e) => {
              if (!saved) e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)'
            }}
            onMouseLeave={(e) => {
              if (!saved) e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  )
}

/* ── Styles ───────────────────────────────────────────────────────────── */
const styles = {
  card: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3 / 4',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-paper-3)',
    border: '1px solid var(--color-border)',
    transition: `transform var(--dur-normal) var(--ease-out),
                 box-shadow var(--dur-normal) var(--ease-out)`,
    cursor: 'pointer',
  },
  cardHovered: {
    transform: 'translateY(-3px)',
    boxShadow: '0 16px 48px var(--color-overlay)',
  },
  mediaLink: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
    transition: `transform var(--dur-slow) var(--ease-out)`,
  },
  badge: {
    position: 'absolute',
    top: 'var(--space-3)',
    left: 'var(--space-3)',
    backgroundColor: 'var(--color-paper-2)',
    color: 'var(--color-ink-2)',
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--color-border)',
    lineHeight: 1.6,
    pointerEvents: 'none',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'var(--color-card-grad)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: 'var(--space-4)',
    opacity: 0,
    transition: `opacity var(--dur-fast) var(--ease-out)`,
  },
  overlayVisible: {
    opacity: 1,
  },
  overlayInner: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 'var(--space-3)',
  },
  titleLink: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    fontStyle: 'normal',
    color: 'var(--color-ink)',
    lineHeight: 'var(--leading-snug)',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  saveBtn: {
    flexShrink: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-semibold)',
    color: 'var(--color-paper)',
    backgroundColor: 'var(--color-accent)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-2) var(--space-4)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color var(--dur-fast) var(--ease-out),
                 transform var(--dur-instant) var(--ease-out)`,
  },
  saveBtnSaved: {
    backgroundColor: 'var(--color-success)',
    cursor: 'default',
  },
}

export default ResultCard
