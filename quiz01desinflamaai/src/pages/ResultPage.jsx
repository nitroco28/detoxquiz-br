import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Activity, Home, Target, TrendingDown, CheckCircle, Flame } from 'lucide-react'
import { useQuiz } from '../QuizContext'

export default function ResultPage() {
  const navigate = useNavigate()
  const { levelId } = useParams()
  const { totalScore, userData } = useQuiz()

  // Função para obter dados do resultado baseado no levelId (1, 2, 3) ou totalScore
  const getResultData = () => {
    let levelIdNum = null
    
    // Se levelId foi fornecido na URL, usa ele
    if (levelId) {
      levelIdNum = parseInt(levelId)
    } else {
      // Caso contrário, calcula baseado no totalScore
      if (totalScore <= 12) {
        levelIdNum = 1
      } else if (totalScore <= 30) {
        levelIdNum = 2
      } else {
        levelIdNum = 3
      }
    }

    // Mapeamento: levelId 1 = Baixo, 2 = Moderado, 3 = Alto
    switch (levelIdNum) {
      case 1:
        return {
          levelId: 1,
          level: 'Baixo',
          levelEn: 'LOW',
          color: 'emerald',
          emoji: '✓',
          mainTitle: 'Bom ponto de partida!',
          mainMessage: 'Você tem um excelente nível base de inflamação',
          percentage: 25,
          scalePosition: 25, // posição na escala de 0-100
          goalPosition: 10, // onde você pode chegar em 30 dias
          goalPercentage: 10,
          goalTitle: 'Seu objetivo em 30 dias: Inflamação Mínima',
          goalDescription: 'Com o protocolo personalizado, você pode reduzir ainda mais a inflamação, acelerar o metabolismo e alcançar seu corpo ideal.',
          feedbackTitle: 'Nível de inflamação controlado',
          feedbackMessage: 'Você tem uma base excelente para começar a tonificar e alcançar seu corpo ideal. Seu metabolismo está respondendo bem.',
          fitnessLevel: 'Bom',
          lifestyle: 'Ativa',
          targetZone: 'Manutenção',
          bodyImage: '/images/result-low.jpg', // PLACEHOLDER: Imagem de mulher saudável, corpo fitness, sorrindo
          recommendation: 'Continue com bons hábitos e faça pequenos ajustes para otimizar ainda mais seus resultados.'
        }
      case 2:
        return {
          levelId: 2,
          level: 'Moderado',
          levelEn: 'MODERATE',
          color: 'amber',
          emoji: '⚠',
          mainTitle: 'Atenção necessária',
          mainMessage: 'Seu corpo está mostrando sinais de inflamação moderada',
          percentage: 55,
          scalePosition: 55,
          goalPosition: 20, // onde você pode chegar em 30 dias
          goalPercentage: 20,
          goalTitle: 'Transformação em 30 dias: -35% de Inflamação',
          goalDescription: 'Seguindo o protocolo anti-inflamatório, você pode reduzir significativamente a inflamação, desinchar e começar a emagrecer naturalmente.',
          feedbackTitle: 'Inflamação moderada detectada',
          feedbackMessage: 'Você está no momento certo para agir. Com o protocolo adequado, você pode reverter a inflamação e destravar seu emagrecimento rapidamente.',
          fitnessLevel: 'Intermediário',
          lifestyle: 'Sedentária',
          targetZone: 'Desinchar',
          bodyImage: '/images/result-moderate.jpg', // PLACEHOLDER: Imagem de mulher com corpo comum, preocupada
          recommendation: 'Um protocolo detox estruturado pode destravar seu metabolismo nas próximas semanas.'
        }
      case 3:
        return {
          levelId: 3,
          level: 'Alto',
          levelEn: 'HIGH',
          color: 'rose',
          emoji: '!',
          mainTitle: 'Ação urgente recomendada',
          mainMessage: 'Seu corpo está com nível crítico de inflamação',
          percentage: 85,
          scalePosition: 85,
          goalPosition: 30, // onde você pode chegar em 30 dias
          goalPercentage: 30,
          goalTitle: 'Resultado esperado em 30 dias: -55% de Inflamação',
          goalDescription: 'Com o protocolo detox intensivo, você pode reduzir drasticamente a inflamação, eliminar inchaço, perder peso e recuperar energia. Quanto maior o problema, maior a transformação!',
          feedbackTitle: 'Inflamação alta identificada',
          feedbackMessage: 'Seu corpo está pedindo ajuda urgente. A boa notícia: quanto maior a inflamação, mais dramática será sua transformação quando você começar o tratamento adequado.',
          fitnessLevel: 'Iniciante',
          lifestyle: 'Muito sedentária',
          targetZone: 'Emergencial',
          bodyImage: '/images/result-high.jpg', // PLACEHOLDER: Imagem de mulher com sobrepeso, inchada
          recommendation: 'Você precisa de um protocolo detox intensivo AGORA para reverter esse quadro.'
        }
      default:
        return {
          levelId: 1,
          level: 'Baixo',
          levelEn: 'LOW',
          color: 'emerald',
          emoji: '✓',
          mainTitle: 'Bom ponto de partida!',
          mainMessage: 'Você tem um excelente nível base de inflamação',
          percentage: 25,
          scalePosition: 25,
          goalPosition: 10,
          goalPercentage: 10,
          goalTitle: 'Seu objetivo em 30 dias: Inflamação Mínima',
          goalDescription: 'Com o protocolo personalizado, você pode reduzir ainda mais a inflamação e alcançar seu corpo ideal.',
          feedbackTitle: 'Nível de inflamação controlado',
          feedbackMessage: 'Você tem uma base excelente para começar a tonificar e alcançar seu corpo ideal.',
          fitnessLevel: 'Bom',
          lifestyle: 'Ativa',
          targetZone: 'Manutenção',
          bodyImage: '/images/result-low.jpg',
          recommendation: 'Continue com bons hábitos e faça pequenos ajustes.'
        }
    }
  }

  const resultData = getResultData()
  const weightToLose = userData.currentWeight && userData.goalWeight ? 
    (userData.currentWeight - userData.goalWeight).toFixed(1) : null

  // Configuração de cores por nível - Desinflama.ai
  const colorConfig = {
    emerald: {
      primary: 'bg-desinflama-teal',
      light: 'bg-desinflama-sage-50',
      text: 'text-desinflama-teal-600',
      border: 'border-desinflama-sage-300',
      gradient: 'from-desinflama-teal to-desinflama-sage-600'
    },
    amber: {
      primary: 'bg-desinflama-gold',
      light: 'bg-desinflama-gold-50',
      text: 'text-desinflama-gold-700',
      border: 'border-desinflama-gold-300',
      gradient: 'from-desinflama-gold to-desinflama-terracotta'
    },
    rose: {
      primary: 'bg-desinflama-terracotta',
      light: 'bg-desinflama-terracotta-50',
      text: 'text-desinflama-terracotta-600',
      border: 'border-desinflama-terracotta-300',
      gradient: 'from-desinflama-terracotta to-desinflama-terracotta-600'
    }
  }
  
  const colors = colorConfig[resultData.color]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-desinflama-cream via-desinflama-cream-100 to-white"
    >
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-desinflama-teal rounded-full mb-4">
            <Flame className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Main Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-desinflama-sage-200"
        >
          {/* Title Section */}
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-desinflama-teal text-center mb-2">
              Seu ponto de partida
            </h1>
            </div>

          {/* Inflammation Level Scale */}
          <div className="px-6 md:px-10 pb-8">
            <div className="bg-gradient-to-br from-desinflama-sage-50 to-desinflama-cream rounded-2xl p-6 md:p-8 border border-desinflama-sage-200">
              <h2 className="text-base md:text-lg font-bold text-desinflama-teal mb-6">
                Nível de Inflamação Corporal
              </h2>

              {/* Scale */}
              <div className="relative mb-8">
                {/* Scale bar */}
                <div className="relative h-3 bg-gradient-to-r from-desinflama-teal via-desinflama-gold to-desinflama-terracotta rounded-full overflow-hidden shadow-inner">
                  {/* Current Position Indicator */}
                  <motion.div
                    initial={{ left: '0%' }}
                    animate={{ left: `${resultData.scalePosition}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                    style={{ left: `${resultData.scalePosition}%` }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-desinflama-teal border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-desinflama-teal text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                          Você hoje - {resultData.percentage}%
                        </div>
                        <div className="w-2 h-2 bg-desinflama-teal rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                      </div>
              </div>
                  </motion.div>

                  {/* Goal Position Indicator (30 days) */}
                  <motion.div
                    initial={{ left: `${resultData.scalePosition}%`, opacity: 0 }}
                    animate={{ left: `${resultData.goalPosition}%`, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                    style={{ left: `${resultData.goalPosition}%` }}
                  >
                    <div className="relative">
                      {/* Star icon */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className={`w-10 h-10 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center shadow-xl border-3 border-white`}
                      >
                        <span className="text-white text-xl drop-shadow-md">★</span>
                      </motion.div>
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className={`bg-gradient-to-r ${colors.gradient} text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-xl`}>
                          Meta 30 dias - {resultData.goalPercentage}%
                        </div>
                        <div className={`w-2 h-2 ${colors.primary} rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1`}></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connection line between current and goal */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.abs(resultData.goalPosition - resultData.scalePosition)}%`,
                      left: `${Math.min(resultData.scalePosition, resultData.goalPosition)}%`
                    }}
                    transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 -translate-y-1/2 h-1 bg-white/40 backdrop-blur-sm"
                    style={{ 
                      left: `${Math.min(resultData.scalePosition, resultData.goalPosition)}%`,
                    }}
                  />
            </div>

                {/* Labels */}
                <div className="flex justify-between mt-3 text-xs md:text-sm font-semibold text-desinflama-teal-600">
                  <span>0</span>
                  <span className="text-desinflama-teal">BAIXO</span>
                  <span className="text-desinflama-gold-700">MODERADO</span>
                  <span className="text-desinflama-terracotta">ALTO</span>
                  <span>100</span>
                </div>
              </div>

              {/* Goal Achievement Box */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                className={`bg-gradient-to-r ${colors.gradient} rounded-xl p-4 mb-6 text-white relative overflow-hidden`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                </div>
                
                <div className="relative flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">
                      {resultData.goalTitle}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {resultData.goalDescription}
                    </p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    ★
                  </motion.div>
            </div>
          </motion.div>

              {/* Feedback Box */}
        <motion.div
                initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={`${colors.light} border-l-4 ${colors.border} rounded-xl p-5`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${colors.primary} rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className="text-white font-bold text-sm">{resultData.emoji}</span>
                  </div>
                  <div>
                    <h3 className={`font-bold text-slate-800 mb-2`}>
                      {resultData.feedbackTitle}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {resultData.feedbackMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Info Card with Image */}
          <div className="px-6 md:px-10 pb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-slate-50 rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left side - Info */}
                <div className="space-y-5">
                  {/* Fitness Level */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                        Nível Metabólico
                      </p>
                      <p className="font-bold text-slate-800">
                        {resultData.fitnessLevel}
                      </p>
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Home className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                        Estilo de Vida
                      </p>
                      <p className="font-bold text-slate-800">
                        {resultData.lifestyle}
                      </p>
                    </div>
                  </div>

                  {/* Target Zone */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                        Área Prioritária
                      </p>
                      <p className="font-bold text-slate-800">
                        {resultData.targetZone}
                      </p>
                    </div>
                  </div>

                  {/* Goal */}
                  {weightToLose && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                          Meta
                        </p>
                        <p className="font-bold text-slate-800">
                          Perder {weightToLose}kg
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side - Image */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 min-h-[280px] md:min-h-[320px]">
                  <img
                    src={resultData.bodyImage}
                    alt="Resultado visual"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para quando a imagem não existir
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="text-center px-4">
                            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                              <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                            <p class="text-slate-500 text-sm font-medium">Imagem de Resultado</p>
                            <p class="text-slate-400 text-xs mt-1">${resultData.level}</p>
                          </div>
                        </div>
                      `
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recommendation Box */}
          <div className="px-6 md:px-10 pb-8">
        <motion.div
              initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-6 text-white`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Recomendação Personalizada</h3>
                  <p className="text-white/90 leading-relaxed">
                    {resultData.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="px-6 md:px-10 pb-10">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/protocol')}
            className="w-full bg-gradient-to-r from-desinflama-teal via-desinflama-teal-600 to-desinflama-sage hover:from-desinflama-teal-700 hover:to-desinflama-sage-700 text-white font-bold py-5 px-6 rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-3"
          >
              Ver Protocolo Completo
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            
            <p className="text-center text-sm text-desinflama-teal-600 mt-4">
              Receba seu plano personalizado completo
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-8 text-sm text-desinflama-teal-600"
        >
          <p>✨ Baseado nas suas respostas personalizadas</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
