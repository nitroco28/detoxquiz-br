import { Routes, Route, Navigate } from 'react-router-dom'
import NavigationPage from './pages/NavigationPage'
import WelcomePage from './pages/WelcomePage'
import QuizPage from './pages/QuizPage'
import TestimonialPage from './pages/TestimonialPage'
import LoadingPage from './pages/LoadingPage'
import ProjectionPage from './pages/ProjectionPage'
import ResultPage from './pages/ResultPage'
import ProtocolPage from './pages/ProtocolPage'

function App() {
    return (
    <Routes>
      <Route path="/" element={<Navigate to="/navigation" replace />} />
      <Route path="/navigation" element={<NavigationPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/quiz/:questionId" element={<QuizPage />} />
      <Route path="/testimonial" element={<TestimonialPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/projection" element={<ProjectionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/protocol" element={<ProtocolPage />} />
    </Routes>
  )
}

export default App
