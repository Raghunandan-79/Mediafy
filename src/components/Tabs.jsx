import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'

const TABS = [
  { id: 'photos', label: 'Photos', icon: '⬛' },
  { id: 'videos', label: 'Videos', icon: '▶' },
]

const Tabs = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  const handleChange = (id) => {
    dispatch(setActiveTabs(id))
  }

  return (
    <div style={styles.wrapper} role="tablist" aria-label="Media type">
      <div style={styles.strip}>
        {TABS.map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleChange(tab.id)}
              style={{
                ...styles.tab,
                ...(active ? styles.tabActive : styles.tabInactive),
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'var(--color-paper-4)'
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={styles.tabLabel}>{tab.label}</span>
              {active && <span style={styles.activeDot} aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      <div style={styles.divider} aria-hidden="true" />
    </div>
  )
}

/* ── Styles ───────────────────────────────────────────────────────────── */
const styles = {
  wrapper: {
    padding: 'var(--space-6) var(--gutter) 0',
    maxWidth: 'var(--width-content)',
    margin: '0 auto',
  },
  strip: {
    display: 'inline-flex',
    gap: 'var(--space-1)',
    backgroundColor: 'var(--color-paper-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-1)',
  },
  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-medium)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-2) var(--space-5)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color var(--dur-fast) var(--ease-out),
                 color var(--dur-fast) var(--ease-out)`,
    outline: 'none',
  },
  tabActive: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-paper)',
  },
  tabInactive: {
    backgroundColor: 'transparent',
    color: 'var(--color-ink-2)',
  },
  tabLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontSize: 'var(--text-xs)',
  },
  activeDot: {
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-paper)',
    opacity: 0.7,
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    marginTop: 'var(--space-5)',
  },
}

export default Tabs
