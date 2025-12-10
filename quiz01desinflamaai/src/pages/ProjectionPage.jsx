import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useQuiz } from '../QuizContext'
import { useEffect } from 'react'

export default function ProjectionPage() {
  const navigate = useNavigate()
  const { userData } = useQuiz()

  const getEventName = () => {
    const names = {
      wedding: "Casamento",
      travel: "Viagem",
      birthday: "Aniversário",
      professional: "Evento Profissional",
      wellness: "Bem-estar"
    }
    return names[userData.motivation] || "Evento"
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
  }
  
  const calculateProjection = () => {
    if (!userData.currentWeight || !userData.goalWeight || !userData.eventDate) {
      return null
    }
    
    const today = new Date()
    const eventDate = new Date(userData.eventDate)
    const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
    
    if (daysDiff < 0) return null
    
    const weightToLose = userData.currentWeight - userData.goalWeight
    const weeks = Math.ceil(daysDiff / 7)
    const safeLossPerWeek = 0.5
    const maxPossibleLoss = weeks * safeLossPerWeek
    
    const projectedWeight = Math.max(
      userData.goalWeight,
      userData.currentWeight - maxPossibleLoss
    )
    
    return {
      startWeight: userData.currentWeight,
      projectedWeight: parseFloat(projectedWeight.toFixed(1)),
      goalWeight: userData.goalWeight,
      daysDiff,
      weeks,
      eventDateFormatted: formatDate(userData.eventDate),
      eventName: getEventName()
    }
  }
  
  const projection = calculateProjection()
  
  // Se não houver dados de projeção, redireciona diretamente para o resultado
  useEffect(() => {
    if (!projection) {
      navigate('/result', { replace: true })
    }
  }, [projection, navigate])
  
  if (!projection) {
    return null
  }
  
  const startWeight = projection.startWeight
  const endWeight = projection.projectedWeight
  const goalWeight = projection.goalWeight
  const totalWeightToLose = startWeight - goalWeight
  const projectedLoss = startWeight - endWeight
  
  const startYPercent = 10
  const endYPercent = 10 + (projectedLoss / totalWeightToLose) * 80
  const midYPercent = (startYPercent + endYPercent) / 2
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white relative"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 lg:p-12"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-center">
            O último plano de que você vai precisar para emagrecer
          </h1>
          
          <p className="text-base md:text-lg text-slate-700 mb-2 text-center">
            Prevemos que você estará com <span className="font-bold text-rose-600">{projection.projectedWeight}kg</span> até {projection.eventDateFormatted}
          </p>
          
          <div className="flex justify-center mb-8">
            <span className="inline-block bg-amber-100 text-amber-900 px-4 py-2 rounded-full text-sm md:text-base font-medium">
              Bem a tempo para o {projection.eventName}
            </span>
          </div>
          
          {/* Gráfico */}
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-6 border border-slate-200">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs md:text-sm text-slate-600 font-medium">
                <span>{startWeight}kg</span>
                <span>{((startWeight + endWeight) / 2).toFixed(1)}kg</span>
                <span>{endWeight}kg</span>
              </div>
              
              <div className="ml-12 md:ml-16 h-64 md:h-80 relative">
                <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="weightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="33%" stopColor="#f97316" />
                      <stop offset="66%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d={`M 10% ${startYPercent}% Q 50% ${midYPercent * 0.7}% 90% ${endYPercent}% L 90% 95% L 10% 95% Z`}
                    fill="url(#weightGradient)"
                    opacity="0.15"
                  />
                  
                  <path
                    d={`M 10% ${startYPercent}% Q 50% ${midYPercent * 0.7}% 90% ${endYPercent}%`}
                    stroke="url(#weightGradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  <circle cx="10%" cy={`${startYPercent}%`} r="7" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <circle cx="90%" cy={`${endYPercent}%`} r="9" fill="white" stroke="#22c55e" strokeWidth="3" />
                </svg>
                
                <div className="absolute top-0 left-0 right-0 flex justify-between text-xs md:text-sm text-slate-600">
                  <span>Hoje</span>
                  <span>{projection.eventDateFormatted}</span>
                </div>
                
                <div className="absolute top-2 right-2 md:top-4 md:right-4">
                  <div className="bg-amber-100 text-amber-900 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium shadow-sm">
                    {projection.eventName}
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-2 md:right-4 transform translate-y-full mt-2">
                  <div className="bg-slate-800 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium shadow-lg">
                    Objetivo {goalWeight}kg
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs md:text-sm text-slate-500 text-center mb-6 italic">
            *Com base nos dados de usuários que registram seu progresso no app. Consulte seu médico antes. O gráfico é uma ilustração não personalizada e os resultados podem variar.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/result')}
            className="w-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-5 md:py-6 px-8 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-base md:text-lg"
          >
            CONTINUAR
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}





