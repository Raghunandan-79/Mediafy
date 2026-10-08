import { useDispatch, useSelector } from 'react-redux'
import CollectionCard from '../components/CollectionCard'
import { clearCollection } from '../redux/features/collectionSlice'
import { useState } from 'react'

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items)
  const dispatch = useDispatch()
  const [clearHovered, setClearHovered] = useState(false)

  const clearAll = () => {
    dispatch(clearCollection())
  }

  if (collection.length === 0) {
    return (
      <main style={styles.main}>
        <div style={styles.emptyState}>
          <span style={styles.emptyIcon} aria-hidden="true">◻</span>
          <h1 style={styles.emptyHeading}>Your collection is empty</h1>
          <p style={styles.emptyBody}>
            Search for photos and videos, then hit Save to add them here.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.main}>
      <div style={styles.inner}>

        {/* Page header */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>Your Collection</h1>
            <p style={styles.pageCount}>
              {collection.length} saved {collection.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <button
            onClick={clearAll}
            style={{
              ...styles.clearBtn,
              ...(clearHovered ? styles.clearBtnHovered : {}),
            }}
            onMouseEnter={() => setClearHovered(true)}
            onMouseLeave={() => setClearHovered(false)}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            aria-label="Clear entire collection"
          >
            Clear all
          </button>
        </div>

        {/* Grid */}
        <div style={styles.grid}>
          {collection.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  )
}

/* ── Styles ───────────────────────────────────────────────────────────── */
const styles = {
  main: {
    minHeight: 'calc(100vh - var(--nav-height))',
  },
  inner: {
    maxWidth: 'var(--width-content)',
    margin: '0 auto',
    padding: 'var(--space-10) var(--gutter)',
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 'var(--space-6)',
    marginBottom: 'var(--space-10)',
    flexWrap: 'wrap',
  },
  pageTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))',
    fontWeight: 'var(--weight-bold)',
    fontStyle: 'normal',
    color: 'var(--color-ink)',
    letterSpacing: '-0.02em',
    lineHeight: 'var(--leading-tight)',
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  pageCount: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-ink-3)',
    marginTop: 'var(--space-1)',
  },
  clearBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    color: 'var(--color-danger)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-danger)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-2) var(--space-5)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color var(--dur-fast) var(--ease-out),
                 color var(--dur-fast) var(--ease-out),
                 transform var(--dur-instant) var(--ease-out)`,
    flexShrink: 0,
  },
  clearBtnHovered: {
    backgroundColor: 'var(--color-danger)',
    color: 'var(--color-ink)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
    gap: 'var(--space-4)',
    alignItems: 'start',
  },
  /* Empty state */
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: 'calc(100vh - var(--nav-height))',
    padding: 'var(--space-12) var(--gutter)',
  },
  emptyIcon: {
    display: 'block',
    fontSize: '3rem',
    color: 'var(--color-paper-5)',
    marginBottom: 'var(--space-6)',
  },
  emptyHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))',
    fontWeight: 'var(--weight-bold)',
    fontStyle: 'normal',
    color: 'var(--color-ink)',
    letterSpacing: '-0.02em',
    lineHeight: 'var(--leading-tight)',
    marginBottom: 'var(--space-4)',
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  emptyBody: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--color-ink-3)',
    lineHeight: 'var(--leading-normal)',
    maxWidth: '380px',
  },
}

export default CollectionPage
