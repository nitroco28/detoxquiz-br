import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users } from 'lucide-react'
import { testimonials } from '../quizData'
import { useQuiz } from '../QuizContext'

export default function LoadingPage() {
  const navigate = useNavigate()
  const { userData, totalScore } = useQuiz()
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)
  
  const loadingTexts = [
    "Analisando seus dados pessoais...",
    "Calculando seu nível de inflamação...",
    "Identificando bloqueios metabólicos...",
    "Gerando protocolo personalizado...",
    "Preparando seu diagnóstico completo..."
  ]
  
  const testimonial = testimonials[0]

  // Função para calcular o levelId baseado no totalScore
  const getLevelId = () => {
    if (totalScore <= 12) {
      return 1 // Baixo
    } else if (totalScore <= 30) {
      return 2 // Moderado
    } else {
      return 3 // Alto
    }
  }

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          const levelId = getLevelId()
          setTimeout(() => {
            navigate(`/result/${levelId}`, { replace: false })
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 80)
    
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length)
    }, 800)
    
    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 py-12 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center relative"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Loading Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          
          <motion.p
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-base md:text-lg font-medium text-slate-700"
          >
            {loadingTexts[currentText]}
          </motion.p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-8 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full"
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Social Proof */}
        <div className="text-center mb-8">
          <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            10.127 mulheres
          </p>
          <p className="text-sm md:text-base text-slate-600">
            optaram pelo Protocolo Detox para emagrecer
          </p>
        </div>
        
        {/* Testemunho Compacto */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 md:p-6">
          <div className="flex gap-1 mb-3 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="font-bold text-base md:text-lg text-slate-900 mb-2 text-center">
            {testimonial.result}
          </p>
          <p className="text-sm md:text-base text-slate-700 mb-3 text-center italic">
            "{testimonial.text}"
          </p>
          <p className="text-xs md:text-sm text-slate-600 text-center font-medium">
            — {testimonial.name}, {testimonial.age} anos
          </p>
        </div>
      </div>
    </motion.div>
  )
}





