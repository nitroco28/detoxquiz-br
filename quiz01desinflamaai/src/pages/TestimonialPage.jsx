import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Clock, TrendingDown } from 'lucide-react'
import { testimonials, testimonialMapping, questions } from '../quizData'
import { useQuiz } from '../QuizContext'

export default function TestimonialPage() {
  const navigate = useNavigate()
  const { questionId: questionIdParam } = useParams()
  const { currentQuestion, setCurrentQuestion } = useQuiz()
  
  // Usar questionIndex do parâmetro da URL como fonte da verdade
  // Fallback para currentQuestion do Context se não houver parâmetro (compatibilidade)
  const questionIndex = questionIdParam !== undefined 
    ? parseInt(questionIdParam) 
    : currentQuestion
  
  // Sincronizar o Context com o valor da URL
  useEffect(() => {
    if (questionIdParam !== undefined && parseInt(questionIdParam) !== currentQuestion) {
      setCurrentQuestion(parseInt(questionIdParam))
    }
  }, [questionIdParam, currentQuestion, setCurrentQuestion])
  
  // Obter o depoimento baseado no ID da pergunta que acionou o depoimento
  // Cada pergunta com feedbackType: "testimonial" deve ter um mapeamento em testimonialMapping
  const getTestimonialIndex = () => {
    const currentQuestionObj = questions[questionIndex]
    if (!currentQuestionObj) {
      console.warn('Question not found at index:', questionIndex)
      return 0 // Fallback: primeiro depoimento
    }
    
    const questionId = currentQuestionObj.id
    const testimonialIndex = testimonialMapping[questionId]
    
    // Se houver mapeamento específico para esta pergunta, usar ele
    if (testimonialIndex !== undefined) {
      return testimonialIndex
    }
    
    // Se não houver mapeamento, algo está errado (pergunta deveria ter feedbackType: "testimonial"?)
    // Fallback seguro: primeiro depoimento
    console.warn(`No testimonial mapping found for question ID ${questionId} (index ${questionIndex}). Using default.`)
    return 0
  }
  
  const testimonialIndex = getTestimonialIndex()
  const testimonial = testimonials[testimonialIndex] || testimonials[0]
  const questionNumber = questionIndex + 1
  const totalQuestions = questions.length
  const progress = (questionNumber / totalQuestions) * 100

  const handleContinue = () => {
    const nextIndex = questionIndex + 1
    if (nextIndex < totalQuestions) {
      setCurrentQuestion(nextIndex)
      navigate(`/quiz/${nextIndex}`, { replace: false })
    } else {
      navigate('/loading', { replace: false })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-desinflama-cream via-desinflama-cream-100 to-white p-3 sm:p-4 md:p-6 lg:p-8"
    >
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm text-desinflama-teal-600 mb-2 font-medium">
          <span>Pergunta {questionNumber} de {totalQuestions}</span>
          <span className="text-desinflama-terracotta font-bold">{Math.round(progress)}% concluído</span>
        </div>
        <div className="w-full bg-desinflama-sage-200 rounded-full h-2 overflow-hidden shadow-inner">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-desinflama-teal via-desinflama-sage to-desinflama-terracotta h-2 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-desinflama-sage-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-desinflama-teal via-desinflama-teal-600 to-desinflama-sage p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-desinflama-gold text-desinflama-gold" />
              ))}
            </div>
            <h3 className="text-white font-bold text-sm sm:text-base">
              Resultado Real de Quem Desinflamou
            </h3>
          </div>

          <div className="p-4 sm:p-5 md:p-6">
            {/* Image */}
            <div className="mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden bg-desinflama-cream border-2 border-desinflama-sage-200">
              <div className="aspect-video relative">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image}
                    alt={testimonial.visual}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-desinflama-sage-600 bg-desinflama-cream">
                    <div className="text-center text-xs sm:text-sm">
                      <div className="font-medium text-desinflama-teal">[ FOTO: {testimonial.visual} ]</div>
                      <div className="mt-1 text-desinflama-teal-700">{testimonial.name}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Result Quote */}
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-desinflama-teal mb-3 sm:mb-4 text-center leading-snug">
              "{testimonial.result}"
            </h4>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {testimonial.weightLost && (
                <div className="bg-desinflama-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-desinflama-teal-200 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-desinflama-teal" />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-desinflama-teal">
                      {testimonial.weightLost}
                    </div>
                    <div className="text-xs sm:text-sm text-desinflama-teal-600">
                      Peso perdido
                    </div>
                  </div>
                </div>
              )}
              {testimonial.time && (
                <div className="bg-desinflama-terracotta-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-desinflama-terracotta-200 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-desinflama-terracotta" />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-desinflama-terracotta">
                      {testimonial.time}
                    </div>
                    <div className="text-xs sm:text-sm text-desinflama-terracotta-600">
                      Para ver resultados
                    </div>
                  </div>
                </div>
              )}
              {testimonial.waistReduction && (
                <div className="bg-desinflama-sage-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-desinflama-sage-200 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-desinflama-sage-700">
                    {testimonial.waistReduction}
                  </div>
                  <div className="text-xs sm:text-sm text-desinflama-sage-600 mt-1">
                    Cintura reduzida
                  </div>
                </div>
              )}
              {testimonial.improvement && (
                <div className="bg-desinflama-gold-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-desinflama-gold-200 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-desinflama-gold-700">
                    {testimonial.improvement}
                  </div>
                  <div className="text-xs sm:text-sm text-desinflama-gold-600 mt-1">
                    Melhoria
                  </div>
                </div>
              )}
            </div>
            
            {/* Before/After */}
            {testimonial.before && testimonial.after && (
              <div className="bg-desinflama-cream rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border-2 border-desinflama-sage-200">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-desinflama-sage-600 mb-1">Antes:</div>
                    <div className="text-desinflama-teal-700 leading-relaxed">{testimonial.before}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-desinflama-teal mb-1">Depois:</div>
                    <div className="text-desinflama-teal-700 leading-relaxed">{testimonial.after}</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Testimonial Text */}
            <p className="text-xs sm:text-sm md:text-base text-desinflama-teal-700 leading-relaxed text-center mb-3 sm:mb-4">
              {testimonial.text}
            </p>
            
            {/* Author Info */}
            <div className="text-center mb-2 sm:mb-3">
              <p className="font-semibold text-desinflama-teal text-sm sm:text-base">
                {testimonial.name}
              </p>
              {testimonial.location && (
                <span className="text-desinflama-sage-600 text-xs sm:text-sm">{testimonial.location}</span>
              )}
            </div>
            
            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-4 sm:mb-5 md:mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-desinflama-gold text-desinflama-gold" />
              ))}
            </div>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg"
            >
              Continuar Avaliação
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
