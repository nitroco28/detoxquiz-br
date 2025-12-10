import { Routes, Route, Navigate } from 'react-router-dom'
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
      <Route path="/" element={<WelcomePage />} />
      <Route path="/quiz/:questionId" element={<QuizPage />} />
      <Route path="/testimonial/:questionId?" element={<TestimonialPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/projection" element={<ProjectionPage />} />
      <Route path="/result/:levelId?" element={<ResultPage />} />
      <Route path="/protocol" element={<ProtocolPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
