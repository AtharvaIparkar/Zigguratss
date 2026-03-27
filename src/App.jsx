import TermsAndConditions from './components/TermsAndConditions'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  return (
    <div className="bg-dark-bg min-h-screen text-white relative overflow-x-hidden selection:bg-gold selection:text-black">
      <BackgroundEffects />
      <TermsAndConditions />
    </div>
  )
}

export default App
