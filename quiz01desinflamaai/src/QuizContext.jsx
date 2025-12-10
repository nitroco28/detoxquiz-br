import { createContext, useContext, useState, useEffect } from 'react'
import { questions, testimonials } from './quizData'

const QuizContext = createContext()

export function QuizProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showQuickFeedback, setShowQuickFeedback] = useState(false)
  const [activeUsers, setActiveUsers] = useState(127)
  const [userData, setUserData] = useState({
    currentWeight: null,
    goalWeight: null,
    height: null,
    bodyGoal: null,
    motivation: null,
    eventDate: null,
    imc: null
  })

  // Simular usuários ativos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(100, Math.min(200, prev + change))
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify({
      currentQuestion,
      totalScore,
      userData
    }))
  }, [currentQuestion, totalScore, userData])

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quizState')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.currentQuestion !== undefined) setCurrentQuestion(parsed.currentQuestion)
        if (parsed.totalScore !== undefined) setTotalScore(parsed.totalScore)
        if (parsed.userData) setUserData(parsed.userData)
      } catch (e) {
        console.error('Error loading quiz state:', e)
      }
    }
  }, [])

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      setCurrentQuestion,
      totalScore,
      setTotalScore,
      selectedOption,
      setSelectedOption,
      showQuickFeedback,
      setShowQuickFeedback,
      activeUsers,
      userData,
      setUserData,
      questions,
      testimonials
    }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider')
  }
  return context
}

