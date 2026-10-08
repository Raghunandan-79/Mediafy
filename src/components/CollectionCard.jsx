import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection, removeToast } from '../redux/features/collectionSlice'

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch()
  const [removing, setRemoving] = useState(false)
  const [hovered, setHovered] = useState(false)

  const removeFromCollection = () => {
    setRemoving(true)
    dispatch(removeCollection(item.id))
    dispatch(removeToast())
  }

  return (
    <article
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHovered : {}),
        ...(removing ? styles.cardRemoving : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={item.title || 'Saved media item'}
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

      {/* Bottom overlay */}
      <div
        style={{
          ...styles.overlay,
          ...(hovered ? styles.overlayVisible : {}),
        }}
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
            onClick={removeFromCollection}
            disabled={removing}
            aria-label="Remove from collection"
            style={{
              ...styles.removeBtn,
              ...(removing ? styles.removeBtnDisabled : {}),
            }}
            onMouseEnter={(e) => {
              if (!removing) e.currentTarget.style.backgroundColor = 'var(--color-danger-dim)'
            }}
            onMouseLeave={(e) => {
              if (!removing) e.currentTarget.style.backgroundColor = 'var(--color-danger)'
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            Remove
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
                 box-shadow var(--dur-normal) var(--ease-out),
                 opacity var(--dur-normal) var(--ease-out)`,
    cursor: 'pointer',
  },
  cardHovered: {
    transform: 'translateY(-3px)',
    boxShadow: '0 16px 48px var(--color-overlay)',
  },
  cardRemoving: {
    opacity: 0.4,
    transform: 'scale(0.97)',
    pointerEvents: 'none',
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
  removeBtn: {
    flexShrink: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-semibold)',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-danger)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-2) var(--space-4)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color var(--dur-fast) var(--ease-out),
                 transform var(--dur-instant) var(--ease-out)`,
  },
  removeBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}

export default CollectionCard
