import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { useQuiz } from '../QuizContext'

export default function ProtocolPage() {
  const navigate = useNavigate()
  const { totalScore, userData } = useQuiz()

  const getResultData = () => {
    if (totalScore <= 12) {
      return { level: 'Baixo', percentage: 20 }
    } else if (totalScore <= 30) {
      return { level: 'Moderado', percentage: 50 }
    } else {
      return { level: 'Alto', percentage: 85 }
    }
  }

  const resultData = getResultData()
  const weightToLose = userData.currentWeight && userData.goalWeight ? 
    (userData.currentWeight - userData.goalWeight).toFixed(1) : null
  const estimatedDays = weightToLose ? Math.ceil(weightToLose / 0.5 * 7) : 60
  const estimatedMonths = Math.ceil(estimatedDays / 30)
  
  const bodyGoalNames = {
    lean: "Magra e Definida",
    flat: "Barriga Chapada e Cintura Fina",
    toned: "Tonificada com Curvas",
    athletic: "Atlética e Musculosa"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 py-8 md:py-12 bg-gradient-to-b from-rose-50/30 via-white to-purple-50/20 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 px-5 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            ✨ Protocolo Personalizado para Você
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Seu Plano Detox de 30 Dias
          </h1>
          <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Com base no seu nível de inflamação <span className="font-semibold text-rose-600">({resultData.level})</span>, 
            criamos o protocolo perfeito para você alcançar <span className="font-semibold text-purple-600">{userData.goalWeight || 'seu objetivo'}kg</span> e 
            conquistar o corpo <span className="font-semibold text-rose-600">{bodyGoalNames[userData.bodyGoal] || "dos seus sonhos"}</span>
          </p>
        </motion.div>

        {/* Gráfico de Evolução */}
        {userData.currentWeight && userData.goalWeight && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border border-rose-100 p-6 md:p-8 lg:p-12 mb-12"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-slate-900">
              Sua Jornada de Transformação Projetada
            </h2>
            
            <div className="bg-gradient-to-br from-rose-50/50 to-purple-50/50 rounded-2xl border border-rose-100/50 p-6 md:p-8 mb-6">
              <div className="flex items-end justify-between h-32 md:h-48 relative mb-8">
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-gradient-to-br from-rose-200 to-rose-300 rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center flex-col mb-4 border-4 border-white shadow-lg">
                    <div className="text-lg md:text-2xl font-bold text-rose-900">{userData.currentWeight}kg</div>
                    <div className="text-[10px] md:text-xs text-rose-800">HOJE</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm md:text-base text-slate-800">Você Hoje</div>
                    <div className="text-xs md:text-sm text-rose-600">Inflamação: {resultData.percentage}%</div>
                  </div>
                </div>

                <div className="flex-1 flex items-center mb-12">
                  <div className="w-full h-2 bg-rose-100 rounded-full relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-rose-400 via-purple-400 to-purple-500"
                    />
                  </div>
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-2 md:mx-4 text-purple-400" />
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center flex-col mb-4 border-4 border-white shadow-lg">
                    <div className="text-lg md:text-2xl font-bold text-white">{userData.goalWeight}kg</div>
                    <div className="text-[10px] md:text-xs text-purple-100">{estimatedMonths} MESES</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm md:text-base text-slate-800">Você Transformada</div>
                    <div className="text-xs md:text-sm text-purple-600">Inflamação: 0-10%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
                <div className="bg-white rounded-xl p-3 md:p-4 text-center border border-rose-200 shadow-sm">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">-{weightToLose}kg</div>
                  <div className="text-[10px] md:text-xs text-slate-600 mt-1">Peso a Perder</div>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 text-center border border-purple-200 shadow-sm">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">{estimatedDays} dias</div>
                  <div className="text-[10px] md:text-xs text-slate-600 mt-1">Tempo Estimado</div>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 text-center border border-rose-200 shadow-sm">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">0.5kg/sem</div>
                  <div className="text-[10px] md:text-xs text-slate-600 mt-1">Perda Saudável</div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm md:text-base text-slate-700">
              💜 Com o Protocolo Detox, você vai desinflamar progressivamente e emagrecer de forma saudável e sustentável
            </p>
          </motion.div>
        )}

        {/* O que é o Protocolo */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 lg:p-12 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
            O Que É o Protocolo Detox 30 Dias?
          </h2>
          
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
            O Protocolo Detox 30 Dias é um programa completo e cientificamente validado de desintoxicação metabólica que vai reduzir sua inflamação de forma progressiva e segura, restaurar seu metabolismo e permitir que você finalmente emagreça de verdade.
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-3xl md:text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-slate-800 mb-2">Específico</h3>
              <p className="text-xs md:text-sm text-slate-600">Personalizado para seu nível de inflamação</p>
            </div>
            <div className="text-center p-4 md:p-6 bg-rose-50 rounded-2xl border border-rose-200">
              <div className="text-3xl md:text-4xl mb-3">🔬</div>
              <h3 className="font-bold text-slate-800 mb-2">Científico</h3>
              <p className="text-xs md:text-sm text-slate-600">Baseado em estudos validados</p>
            </div>
            <div className="text-center p-4 md:p-6 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-3xl md:text-4xl mb-3">✅</div>
              <h3 className="font-bold text-slate-800 mb-2">Completo</h3>
              <p className="text-xs md:text-sm text-slate-600">Tudo que você precisa em um lugar</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Principal */}
        <div className="text-center mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-2xl mx-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 md:py-6 px-6 md:px-10 rounded-2xl transition-all text-lg md:text-xl shadow-xl flex items-center justify-center gap-3"
          >
            💚 Quero Meu Protocolo Detox por R$ 47 →
          </motion.button>
          <p className="text-xs md:text-sm text-slate-600 mt-4">
            ⏰ Oferta especial • Acesso por 12 meses • Garantia de 7 dias
          </p>
        </div>
      </div>
    </motion.div>
  )
}





