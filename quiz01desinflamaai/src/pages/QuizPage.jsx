import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Sparkles, Heart, Target, TrendingUp, Zap } from 'lucide-react'
import { questions } from '../quizData'
import { useQuiz } from '../QuizContext'
import SliderInput from '../components/SliderInput'

export default function QuizPage() {
  const { questionId } = useParams()
  const navigate = useNavigate()
  const { 
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
    setUserData
  } = useQuiz()

  const questionIndex = questionId ? parseInt(questionId) : currentQuestion
  const question = questions[questionIndex]
  const questionNumber = questionIndex + 1
  const totalQuestions = questions.length
  const progress = (questionNumber / totalQuestions) * 100

  // Sincronizar currentQuestion com o parâmetro da URL
  useEffect(() => {
    if (questionId !== undefined) {
      const index = parseInt(questionId)
      if (index !== currentQuestion) {
        setCurrentQuestion(index)
      }
    }
  }, [questionId, currentQuestion, setCurrentQuestion])

  const getInitialValue = () => {
    if (question?.type === 'weight') return '70'
    if (question?.type === 'goalWeight') return '60'
    if (question?.type === 'height') return '1.65'
    return ''
  }
  
  const [inputValue, setInputValue] = useState(getInitialValue())

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    if (option.score !== undefined) {
      setTotalScore(prev => prev + option.score)
    }
    
    // Salvar dados específicos
    if (question.type === 'bodyGoal') {
      setUserData(prev => ({ ...prev, bodyGoal: option.value }))
    } else if (question.type === 'motivation') {
      setUserData(prev => ({ ...prev, motivation: option.value }))
    }
    
    // Atualizar currentQuestion no Context antes de navegar
    setCurrentQuestion(questionIndex)
    
    // Decidir próxima ação baseado no feedbackType
    if (question.feedbackType === 'quick') {
      setShowQuickFeedback(true)
    } else if (question.feedbackType === 'testimonial') {
      navigate(`/testimonial/${questionIndex}`, { replace: false })
    } else if (question.feedbackType === 'none') {
      handleContinue()
    }
  }

  const handleInputSubmit = (value, type) => {
    setUserData(prev => ({ ...prev, [type]: value }))
    if (type === 'height' && userData.currentWeight) {
      const imc = (userData.currentWeight / (value * value)).toFixed(1)
      setUserData(prev => ({ ...prev, imc }))
      setShowQuickFeedback(true)
      setSelectedOption({ imc })
    } else {
      handleContinue()
    }
  }

  const handleContinue = () => {
    setShowQuickFeedback(false)
    setSelectedOption(null)
    
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1
      setCurrentQuestion(nextIndex)
      navigate(`/quiz/${nextIndex}`, { replace: false })
    } else {
      navigate('/loading', { replace: false })
    }
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Pergunta não encontrada</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen p-4 py-8 md:p-4 md:py-8 lg:py-16 relative bg-gradient-to-br from-desinflama-cream via-desinflama-cream-100 to-white"
    >
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-6 md:mb-8">
        <div className="flex items-center justify-between text-xs md:text-sm text-desinflama-teal-600 mb-2 md:mb-3 font-medium">
          <span>Pergunta {questionNumber} de {totalQuestions}</span>
          <span className="text-desinflama-terracotta font-bold">{Math.round(progress)}% concluído</span>
        </div>
        <div className="w-full bg-desinflama-sage-200 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner mb-2 md:mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-desinflama-teal via-desinflama-sage to-desinflama-terracotta h-full rounded-full shadow-sm"
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        {activeUsers && (
          <div className="flex items-center justify-center gap-1.5 md:gap-2 text-desinflama-teal-600 text-xs md:text-sm">
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-desinflama-terracotta" />
            <span>
              <span className="font-semibold text-desinflama-terracotta">{activeUsers}</span> pessoas fazendo agora
            </span>
          </div>
        )}
      </div>

      {/* Question */}
      <div className={`mx-auto px-4 ${question.type === 'bodyGoal' ? 'max-w-7xl' : 'max-w-3xl'}`}>
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`bg-white rounded-2xl md:rounded-3xl shadow-xl border-2 border-desinflama-sage-200 mb-4 md:mb-6 ${
            question.type === 'bodyGoal' 
              ? 'p-5 md:p-6 lg:p-8'
              : 'p-5 md:p-6 lg:p-10 xl:p-12'
          }`}
        >
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-desinflama-teal mb-6 md:mb-3 leading-tight text-center">
            {question.question}
          </h2>
          
          {/* Subtítulo para pergunta de tipo de corpo */}
          {question.type === 'bodyGoal' && (
            <p className="text-sm md:text-base text-desinflama-teal-600 mb-6 md:mb-8 text-center">
              Visualize sua meta para se manter motivado e responsável
            </p>
          )}

          {/* Slider para peso/altura */}
          {(question.type === 'weight' || question.type === 'goalWeight' || question.type === 'height') && (
            <div className="max-w-2xl mx-auto">
              <SliderInput
                question={question}
                value={inputValue}
                setValue={setInputValue}
                onContinue={() => {
                  if (inputValue) {
                    handleInputSubmit(parseFloat(inputValue), question.type)
                  }
                }}
              />
            </div>
          )}

          {/* Escolha visual do tipo de corpo - Grid responsivo */}
          {question.type === 'bodyGoal' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {question.options.map((option, index) => {
                // Mapear as imagens para cada opção - usando as novas imagens 2bm
                const imageMap = {
                  'lean': '/images/magro2bm.webp',      // Magra
                  'flat': '/images/volume2bm.webp',     // Fortalecida
                  'toned': '/images/tonificado2bm.webp', // Tonificado
                  'athletic': '/images/comcurvas2bm.webp' // Com curvas
                }
                
                const imageSrc = imageMap[option.value] || ''
                
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option)}
                    className={`relative overflow-hidden rounded-2xl lg:rounded-3xl border-2 transition-all ${
                      selectedOption === option
                        ? 'border-desinflama-terracotta shadow-xl'
                        : 'border-desinflama-sage-200 hover:border-desinflama-sage-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="aspect-[3/4] relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                      {imageSrc && (
                        <img 
                          src={imageSrc}
                          alt={option.text}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className={`p-4 md:p-4 lg:p-5 text-center transition-colors relative ${
                      selectedOption === option
                        ? 'bg-white'
                        : 'bg-white'
                    }`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-sm md:text-base lg:text-lg font-semibold flex-1 text-left ${
                          selectedOption === option
                            ? 'text-desinflama-teal'
                            : 'text-desinflama-teal-700'
                        }`}>
                          {option.text}
                        </span>
                        {/* Radio button circular */}
                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex-shrink-0 transition-all ${
                          selectedOption === option
                            ? 'border-desinflama-terracotta bg-desinflama-terracotta'
                            : 'border-desinflama-sage-400 bg-white'
                        }`}>
                          {selectedOption === option && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          )}

          {/* Opções normais de múltipla escolha - LISTA VERTICAL */}
          {(!question.type || question.type === 'motivation') && question.options && (
            <div className="space-y-4 md:space-y-3">
              {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: !showQuickFeedback ? 1.01 : 1, x: !showQuickFeedback ? 2 : 0 }}
                whileTap={{ scale: !showQuickFeedback ? 0.99 : 1 }}
                onClick={() => !showQuickFeedback && handleOptionClick(option)}
                disabled={showQuickFeedback}
                className={`w-full text-left p-4 md:p-4 lg:p-5 rounded-xl md:rounded-2xl border-2 transition-all ${
                  selectedOption === option
                    ? 'border-desinflama-terracotta bg-desinflama-terracotta-50'
                    : 'border-desinflama-sage-200 bg-white hover:border-desinflama-terracotta hover:bg-desinflama-terracotta-50'
                } ${showQuickFeedback ? 'cursor-default opacity-70' : 'cursor-pointer group'} shadow-sm hover:shadow-md`}
              >
                <div className="flex items-center gap-3 md:gap-3">
                  <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedOption === option
                      ? 'border-desinflama-terracotta bg-desinflama-terracotta'
                      : 'border-desinflama-sage-400 group-hover:border-desinflama-terracotta group-hover:bg-desinflama-terracotta'
                  }`}>
                    <span className={`font-semibold text-xs md:text-sm ${
                      selectedOption === option
                        ? 'text-white'
                        : 'text-desinflama-sage-600 group-hover:text-white'
                    }`}>{index + 1}</span>
                  </div>
                  <span className={`font-medium text-sm md:text-base flex-1 leading-snug ${
                    selectedOption === option
                      ? 'text-desinflama-teal'
                      : 'text-desinflama-teal-700 group-hover:text-desinflama-teal'
                  }`}>
                    {option.text}
                  </span>
                  {selectedOption === option && (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-desinflama-terracotta flex-shrink-0" />
                  )}
                  {!showQuickFeedback && selectedOption !== option && (
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-desinflama-sage-600 group-hover:text-desinflama-terracotta transition-all flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
            </div>
          )}

          {/* Feedback Rápido */}
          <AnimatePresence>
            {showQuickFeedback && question.feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mt-4 md:mt-6"
              >
                <div className="bg-gradient-to-r from-desinflama-gold-50 to-desinflama-terracotta-50 border-l-4 border-desinflama-gold rounded-xl p-4 md:p-6">
                  <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-desinflama-gold-700 flex-shrink-0 mt-0.5" />
                    <p className="text-desinflama-teal-700 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
                      {question.feedback}
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3.5 md:py-4 px-5 md:px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base shadow-lg"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}





