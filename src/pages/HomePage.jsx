import { useSelector } from 'react-redux'
import ResultGrid from '../components/ResultGrid'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'

const HomePage = () => {
  const { query } = useSelector((store) => store.search)

  return (
    <main style={styles.main}>
      <SearchBar />
      {query !== '' && (
        <div style={styles.resultsArea} aria-live="polite">
          <Tabs />
          <ResultGrid />
        </div>
      )}
    </main>
  )
}

const styles = {
  main: {
    minHeight: 'calc(100vh - var(--nav-height))',
  },
  resultsArea: {
    width: '100%',
  },
}

export default HomePage
