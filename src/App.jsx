import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div style={styles.root}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
        toastStyle={{
          backgroundColor: 'var(--color-paper-2)',
          color: 'var(--color-ink)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
        }}
      />
    </div>
  )
}

const styles = {
  root: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-paper)',
    color: 'var(--color-ink)',
    width: '100%',
  },
}

export default App
