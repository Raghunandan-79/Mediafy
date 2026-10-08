import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(setQuery(trimmed))
    setText('')
  }

  return (
    <section style={styles.section} aria-label="Search media">
      <div style={styles.inner}>
        <div style={styles.eyebrow}>
          <span style={styles.eyebrowDot} aria-hidden="true" />
          <span style={styles.eyebrowText}>Photos &amp; Videos</span>
        </div>

        <h1 style={styles.heading}>
          Find any media,<br />instantly.
        </h1>

        <p style={styles.subheading}>
          Search millions of free photos and videos. Save your favourites to a collection.
        </p>

        <form
          onSubmit={submitHandler}
          style={{
            ...styles.form,
            ...(focused ? styles.formFocused : {}),
          }}
          role="search"
        >
          {/* Search icon */}
          <span style={styles.searchIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required
            style={styles.input}
            type="search"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search photos, videos…"
            aria-label="Search media"
          />

          <button
            type="submit"
            style={styles.btn}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)' }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            Search
          </button>
        </form>

        <p style={styles.hint}>Try: <span style={styles.hintTag}>nature</span> · <span style={styles.hintTag}>architecture</span> · <span style={styles.hintTag}>people</span></p>
      </div>
    </section>
  )
}

/* ── Styles ───────────────────────────────────────────────────────────── */
const styles = {
  section: {
    padding: 'var(--space-16) var(--gutter) var(--space-12)',
    borderBottom: '1px solid var(--color-border)',
  },
  inner: {
    maxWidth: 'var(--width-narrow)',
    margin: '0 auto',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-6)',
  },
  eyebrowDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-accent)',
  },
  eyebrowText: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-medium)',
    color: 'var(--color-accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(var(--text-3xl), 6vw, var(--text-display-s))',
    fontWeight: 'var(--weight-bold)',
    fontStyle: 'normal',
    color: 'var(--color-ink)',
    letterSpacing: '-0.03em',
    lineHeight: 'var(--leading-tight)',
    marginBottom: 'var(--space-6)',
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  subheading: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--color-ink-2)',
    lineHeight: 'var(--leading-normal)',
    marginBottom: 'var(--space-10)',
    maxWidth: '480px',
    margin: '0 auto var(--space-10)',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    backgroundColor: 'var(--color-paper-3)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    padding: 'var(--space-2)',
    transition: `border-color var(--dur-fast) var(--ease-out),
                 box-shadow var(--dur-fast) var(--ease-out)`,
    overflow: 'hidden',
  },
  formFocused: {
    borderColor: 'var(--color-border-focus)',
    boxShadow: '0 0 0 3px var(--color-accent-glow)',
  },
  searchIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-ink-3)',
    paddingLeft: 'var(--space-3)',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: 'var(--space-3) var(--space-4)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--color-ink)',
    minWidth: 0,
  },
  btn: {
    flexShrink: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    color: 'var(--color-paper)',
    backgroundColor: 'var(--color-accent)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-3) var(--space-6)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color var(--dur-fast) var(--ease-out),
                 transform var(--dur-instant) var(--ease-out)`,
  },
  hint: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-ink-3)',
    marginTop: 'var(--space-4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    flexWrap: 'wrap',
  },
  hintTag: {
    color: 'var(--color-ink-2)',
    cursor: 'pointer',
  },
}

export default SearchBar
