import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/features/searchSlice'
import { useEffect } from 'react'
import ResultCard from './ResultCard'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search
  )

  useEffect(() => {
    if (!query) return

    const getData = async () => {
      try {
        dispatch(setLoading())
        let data = []

        if (activeTab === 'photos') {
          const response = await fetchPhotos(query)
          data = response.results.map((item) => ({
            id: item.id,
            type: 'photo',
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
          }))
        }

        if (activeTab === 'videos') {
          const response = await fetchVideos(query)
          data = response.videos.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.user.name || 'Video',
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url,
          }))
        }

        dispatch(setResults(data))
      } catch (err) {
        dispatch(setError(err.message))
      }
    }

    getData()
  }, [query, activeTab, dispatch])

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (results.length === 0 && query) return <EmptyState query={query} />

  return (
    <section
      style={styles.section}
      aria-label={`${activeTab} results for "${query}"`}
      aria-live="polite"
    >
      <div style={styles.resultsHeader}>
        <p style={styles.resultCount}>
          {results.length} {activeTab} for
          <span style={styles.queryText}> "{query}"</span>
        </p>
      </div>

      <div style={styles.grid}>
        {results.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/* ── Sub-components ───────────────────────────────────────────────────── */
const LoadingState = () => (
  <section style={styles.section} aria-label="Loading results" aria-busy="true">
    <div style={styles.grid}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={styles.skeleton} aria-hidden="true" />
      ))}
    </div>
  </section>
)

const ErrorState = ({ message }) => (
  <section style={{ ...styles.section, ...styles.stateSection }}>
    <div style={styles.stateBox}>
      <span style={styles.stateIcon} aria-hidden="true">⚠</span>
      <h2 style={styles.stateHeading}>Something went wrong</h2>
      <p style={styles.stateBody}>{message || 'Unable to load results. Check your connection and try again.'}</p>
    </div>
  </section>
)

const EmptyState = ({ query }) => (
  <section style={{ ...styles.section, ...styles.stateSection }}>
    <div style={styles.stateBox}>
      <span style={styles.stateIcon} aria-hidden="true">◌</span>
      <h2 style={styles.stateHeading}>No results for "{query}"</h2>
      <p style={styles.stateBody}>Try a different keyword or switch between Photos and Videos.</p>
    </div>
  </section>
)

/* ── Styles ───────────────────────────────────────────────────────────── */

/* Keyframe for skeleton shimmer — injected once via a <style> tag */
const shimmerKeyframes = `
@keyframes mf-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
`

/* Inject keyframes into <head> once */
if (typeof document !== 'undefined' && !document.getElementById('mf-shimmer')) {
  const s = document.createElement('style')
  s.id = 'mf-shimmer'
  s.textContent = shimmerKeyframes
  document.head.appendChild(s)
}

const styles = {
  section: {
    padding: 'var(--space-8) var(--gutter)',
    maxWidth: 'var(--width-content)',
    margin: '0 auto',
  },
  resultsHeader: {
    marginBottom: 'var(--space-6)',
  },
  resultCount: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-ink-3)',
  },
  queryText: {
    color: 'var(--color-ink-2)',
    fontWeight: 'var(--weight-medium)',
  },
  /* Responsive grid — minmax(0, 1fr) prevents overflow on narrow viewports */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
    gap: 'var(--space-4)',
    alignItems: 'start',
  },
  /* Skeleton card */
  skeleton: {
    aspectRatio: '3 / 4',
    borderRadius: 'var(--radius-lg)',
    background: `linear-gradient(
      90deg,
      var(--color-paper-2) 0%,
      var(--color-paper-3) 50%,
      var(--color-paper-2) 100%
    )`,
    backgroundSize: '200% 100%',
    animation: 'mf-shimmer 1.6s ease-in-out infinite',
  },
  /* State screens */
  stateSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh',
  },
  stateBox: {
    textAlign: 'center',
    maxWidth: '380px',
    padding: 'var(--space-8)',
  },
  stateIcon: {
    display: 'block',
    fontSize: '2rem',
    marginBottom: 'var(--space-4)',
    color: 'var(--color-ink-3)',
  },
  stateHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-xl)',
    fontWeight: 'var(--weight-semibold)',
    fontStyle: 'normal',
    color: 'var(--color-ink)',
    marginBottom: 'var(--space-3)',
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  stateBody: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-ink-3)',
    lineHeight: 'var(--leading-normal)',
  },
}

export default ResultGrid
