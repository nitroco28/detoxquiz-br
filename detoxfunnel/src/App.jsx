import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Flame, 
  Heart,
  CheckCircle, 
  AlertTriangle, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Star,
  Quote,
  Target,
  Calendar,
  Users,
  Award,
  Zap,
  Clock
} from 'lucide-react'
import './App.css'

// DADOS DO QUIZ - Perguntas focadas em emagrecimento + dados pessoais + objetivos
const questions = [
  {
    id: 1,
    question: "Qual é o seu peso atual?",
    type: "weight",
    placeholder: "Ex: 75",
    unit: "kg",
    feedbackType: "none"
  },
  {
    id: 2,
    question: "Qual peso você gostaria de alcançar?",
    type: "goalWeight",
    placeholder: "Ex: 62",
    unit: "kg",
    feedbackType: "quick",
    feedback: "🎯 Vamos criar seu plano personalizado para alcançar esse objetivo de forma saudável e sustentável!"
  },
  {
    id: 3,
    question: "Qual é a sua altura?",
    type: "height",
    placeholder: "Ex: 1.65",
    unit: "m",
    feedbackType: "none"
  },
  {
    id: 4,
    question: "Que tipo de corpo você deseja alcançar?",
    type: "bodyGoal",
    options: [
      { text: "Magra e definida", value: "lean", image: "corpo-magro-definido" },
      { text: "Barriga chapada e cintura fina", value: "flat", image: "barriga-chapada" },
      { text: "Tonificada e com curvas", value: "toned", image: "corpo-tonificado" },
      { text: "Atlética e musculosa", value: "athletic", image: "corpo-atletico" }
    ],
    feedbackType: "visual"
  },
  {
    id: 5,
    question: "Há quanto tempo você tenta emagrecer sem sucesso?",
    options: [
      { text: "Não estou tentando emagrecer no momento", score: 0 },
      { text: "Há alguns meses, com resultados lentos", score: 3 },
      { text: "Anos tentando, mas o peso sempre volta", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "💡 Quando a inflamação está alta, seu corpo bloqueia hormônios do emagrecimento como leptina e insulina. Por isso você faz dieta, malha, mas o peso não sai. A solução não é mais restrição, é desinflamar."
  },
  {
    id: 6,
    question: "Como está sua barriga durante o dia?",
    options: [
      { text: "Normal, sem inchaço", score: 0 },
      { text: "Acordo bem, mas incha após as refeições", score: 3 },
      { text: "Vivo inchada, parece que estou grávida", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "⚠️ O inchaço constante não é gordura, é inflamação intestinal. Seu intestino está vazando toxinas que ativam seu sistema imune 24/7. Por isso você se sente pesada mesmo sem comer muito."
  },
  {
    id: 7,
    question: "Quantas vezes por semana você consome açúcar ou doces?",
    options: [
      { text: "Raramente, menos de 2x por semana", score: 0 },
      { text: "3 a 5 vezes por semana", score: 3 },
      { text: "Todos os dias, tenho compulsão por doces", score: 5 }
    ],
    feedbackType: "testimonial"
  },
  {
    id: 8,
    question: "Como você se sente após comer pão, massa ou arroz?",
    options: [
      { text: "Normal, sem mudanças", score: 0 },
      { text: "Fico com sono e um pouco inchada", score: 3 },
      { text: "Extremamente inchada, com sono e até dor", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "🍞 Carboidratos refinados causam picos de insulina que geram inflamação e acúmulo de gordura abdominal. É por isso que você come pão e parece que engordou 3kg no mesmo dia. Não é culpa sua, é inflamação."
  },
  {
    id: 9,
    question: "Você pratica exercícios físicos regularmente?",
    options: [
      { text: "Sim, 4x ou mais por semana", score: 0 },
      { text: "Às vezes, 1 a 2x por semana", score: 2 },
      { text: "Não consigo, não tenho energia", score: 4 }
    ],
    feedbackType: "quick",
    feedback: "🏃‍♀️ A falta de energia não é preguiça. É inflamação mitocondrial. Suas células estão funcionando a 30% da capacidade. Quando você desinflamar, vai ter energia de verdade para treinar e ver resultados."
  },
  {
    id: 10,
    question: "Como é seu sono?",
    options: [
      { text: "Durmo bem e acordo descansada", score: 0 },
      { text: "Durmo, mas acordo cansada", score: 3 },
      { text: "Insônia ou sono muito agitado", score: 5 }
    ],
    feedbackType: "testimonial"
  },
  {
    id: 11,
    question: "Você tem dificuldade para perder gordura na barriga e cintura?",
    options: [
      { text: "Não, perco peso proporcionalmente", score: 0 },
      { text: "Um pouco, é a última parte a emagrecer", score: 3 },
      { text: "Sim, a barriga não diminui de jeito nenhum", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "🎯 Gordura abdominal resistente é sinal de cortisol alto e inflamação sistêmica bloqueando a queima de gordura."
  },
  {
    id: 12,
    question: "Com que frequência você come alimentos industrializados?",
    options: [
      { text: "Raramente, cozinho em casa", score: 0 },
      { text: "3 a 4 vezes na semana", score: 3 },
      { text: "Quase todos os dias", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "🍔 Alimentos ultraprocessados contêm aditivos que destroem a flora intestinal e disparam inflamação."
  },
  {
    id: 13,
    question: "Você sente compulsão alimentar ou ansiedade para comer?",
    options: [
      { text: "Não, como quando tenho fome", score: 0 },
      { text: "Às vezes, principalmente à noite", score: 3 },
      { text: "Sim, tenho compulsão constante", score: 5 }
    ],
    feedbackType: "testimonial"
  },
  {
    id: 14,
    question: "Como está sua disposição no dia a dia?",
    options: [
      { text: "Tenho energia o dia todo", score: 0 },
      { text: "Começo bem, mas canso à tarde", score: 3 },
      { text: "Vivo exausta, sem energia para nada", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "⚡ Fadiga crônica acontece quando a inflamação reduz a produção de energia celular em até 70%."
  },
  {
    id: 15,
    question: "Sua pele está com sinais de envelhecimento ou sem viço?",
    options: [
      { text: "Não, minha pele está saudável", score: 0 },
      { text: "Um pouco, notei mudanças recentes", score: 2 },
      { text: "Sim, pele sem vida, flácida ou com acne", score: 4 }
    ],
    feedbackType: "quick",
    feedback: "✨ A inflamação destrói colágeno 3x mais rápido, causando rugas, flacidez e envelhecimento precoce."
  },
  {
    id: 16,
    question: "Como você descreveria seu metabolismo?",
    options: [
      { text: "Rápido, emagreço com facilidade", score: 0 },
      { text: "Normal, preciso me esforçar", score: 2 },
      { text: "Travado, não emagreço nem com dieta", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "🔥 Metabolismo travado é o resultado de anos de inflamação bloqueando seus hormônios metabólicos."
  }
];

// TESTEMUNHOS - aparecem estrategicamente durante o quiz (com dados específicos)
const testimonials = [
  {
    id: 1,
    name: "Mariana Costa, 38 anos",
    location: "São Paulo, SP",
    result: "Perdi 12kg e eliminei o inchaço em 45 dias",
    before: "78kg, barriga inchada, sem energia",
    after: "66kg, barriga chapada, energia total",
    text: "Fazia dieta há 3 anos sem resultado. Descobri que era inflamação travando meu metabolismo. Depois do detox, finalmente consegui emagrecer de verdade! Em 45 dias perdi 12kg e minha barriga desinchou completamente.",
    rating: 5,
    visual: "Barriga chapada e corpo definido",
    time: "45 dias",
    weightLost: "12kg"
  },
  {
    id: 2,
    name: "Patricia Almeida, 44 anos",
    location: "Rio de Janeiro, RJ",
    result: "Acabou a insônia e voltei a ter energia",
    before: "Acordava 3x por noite, fadiga crônica",
    after: "Durmo 8h seguidas, energia de manhã",
    text: "Dormia mal há 2 anos e vivia cansada. Achava que era normal da idade. Quando desinflame, voltei a dormir como um bebê e acordar disposta. Minha vida mudou completamente!",
    rating: 5,
    visual: "Rosto descansado e radiante",
    time: "30 dias",
    improvement: "100% do sono"
  },
  {
    id: 3,
    name: "Camila Ferreira, 41 anos",
    location: "Belo Horizonte, MG",
    result: "Zerei a compulsão por doces e perdi 15kg",
    before: "82kg, compulsão diária por doces",
    after: "67kg, zero compulsão, controle total",
    text: "Tinha compulsão alimentar terrível há 5 anos. O protocolo detox regulou meus hormônios e a vontade de doce simplesmente sumiu. Emagreci 15kg naturalmente em 60 dias!",
    rating: 5,
    visual: "Transformação impressionante",
    time: "60 dias",
    weightLost: "15kg"
  },
  {
    id: 4,
    name: "Renata Lima, 36 anos",
    location: "Curitiba, PR",
    result: "Minha barriga finalmente desinflou",
    before: "Barriga de 95cm, inchaço constante",
    after: "Cintura de 72cm, barriga chapada",
    text: "Vivia inchada há anos, parecia grávida de 6 meses. Era inflamação intestinal. Depois do programa, minha barriga ficou chapada pela primeira vez em 8 anos! Reduzi 23cm de cintura.",
    rating: 5,
    visual: "Cintura fina e barriga definida",
    time: "50 dias",
    waistReduction: "23cm"
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome') // welcome, quiz, testimonial, result, protocol
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showQuickFeedback, setShowQuickFeedback] = useState(false)
  
  // Social proof - pessoas fazendo o quiz
  const [activeUsers, setActiveUsers] = useState(127)
  
  // Dados pessoais do usuário
  const [userData, setUserData] = useState({
    currentWeight: null,
    goalWeight: null,
    height: null,
    bodyGoal: null
  })

  // Simular usuários ativos (atualiza a cada 3-5 segundos)
  useEffect(() => {
    if (currentScreen === 'quiz') {
      const interval = setInterval(() => {
        setActiveUsers(prev => {
          const change = Math.floor(Math.random() * 5) - 2 // -2 a +2
          return Math.max(100, Math.min(200, prev + change))
        })
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [currentScreen])

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    if (option.score !== undefined) {
      setTotalScore(prev => prev + option.score)
    }
    
    const currentQ = questions[currentQuestion]
    
    // Se for feedback rápido, mostra na mesma tela
    if (currentQ.feedbackType === 'quick') {
      setShowQuickFeedback(true)
    } 
    // Se for testemunho, vai para tela de testemunho
    else if (currentQ.feedbackType === 'testimonial') {
      setCurrentScreen('testimonial')
    }
    // Se for visual (escolha de corpo), mostra feedback visual
    else if (currentQ.feedbackType === 'visual') {
      setUserData(prev => ({ ...prev, bodyGoal: option.value }))
      setShowQuickFeedback(true)
    }
    // Se não tiver feedback, avança direto
    else if (currentQ.feedbackType === 'none') {
      handleQuickFeedbackContinue()
    }
  }

  const handleInputSubmit = (value, type) => {
    setUserData(prev => ({ ...prev, [type]: value }))
    handleQuickFeedbackContinue()
  }

  const handleQuickFeedbackContinue = () => {
    setShowQuickFeedback(false)
    setSelectedOption(null)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setCurrentScreen('result')
    }
  }

  const handleTestimonialContinue = () => {
    setSelectedOption(null)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setCurrentScreen('quiz')
    } else {
      setCurrentScreen('result')
    }
  }

  const getResultData = () => {
    // Score máximo agora é 60 (12 perguntas x 5 pontos)
    if (totalScore <= 12) {
      return {
        level: 'Baixo',
        levelNumber: 1,
        title: 'Inflamação Controlada',
        subtitle: 'Nível 1 de 3',
        color: 'emerald',
        icon: CheckCircle,
        percentage: 20,
        diagnosis: 'Seu corpo apresenta sinais baixos de inflamação. Você está no caminho certo e sua saúde geral está preservada. No entanto, pequenos ajustes podem prevenir que a inflamação aumente e otimizar ainda mais seus resultados.',
        symptoms: [
          'Eventual cansaço após refeições pesadas',
          'Leve retenção de líquidos em alguns momentos',
          'Metabolismo funcionando dentro da normalidade'
        ],
        consequences: [
          'Risco baixo de doenças crônicas no momento',
          'Capacidade de emagrecimento preservada',
          'Energia e disposição dentro do esperado'
        ],
        whatToDo: 'Um protocolo detox preventivo pode turbinar sua energia, acelerar seu metabolismo e garantir que você mantenha o peso ideal sem esforço excessivo.',
        urgency: 'low'
      }
    } else if (totalScore <= 30) {
      return {
        level: 'Moderado',
        levelNumber: 2,
        title: 'Inflamação Moderada',
        subtitle: 'Nível 2 de 3 - Alerta Amarelo',
        color: 'amber',
        icon: AlertTriangle,
        percentage: 50,
        diagnosis: 'Seu corpo está mostrando sinais claros de sobrecarga inflamatória. Você provavelmente enfrenta dificuldades para emagrecer mesmo com dieta, sente cansaço frequente e nota inchaço abdominal recorrente. A inflamação está travando seus hormônios metabólicos.',
        symptoms: [
          'Dificuldade persistente para perder peso',
          'Inchaço abdominal frequente, principalmente após refeições',
          'Fadiga crônica e falta de energia',
          'Compulsão por doces e carboidratos',
          'Pele sem viço ou com acne adulta'
        ],
        consequences: [
          'Metabolismo 40-50% mais lento que o normal',
          'Risco aumentado de diabetes tipo 2',
          'Dificuldade extrema para emagrecer (efeito sanfona)',
          'Envelhecimento acelerado da pele e articulações',
          'Fadiga que compromete qualidade de vida'
        ],
        whatToDo: 'É fundamental implementar um protocolo detox estruturado AGORA para destravar seu emagrecimento, recuperar sua energia e prevenir que a inflamação evolua para um nível crítico.',
        urgency: 'medium'
      }
    } else {
      return {
        level: 'Alto',
        levelNumber: 3,
        title: 'Inflamação Crônica Sistêmica',
        subtitle: 'Nível 3 de 3 - Risco Crítico',
        color: 'rose',
        icon: AlertCircle,
        percentage: 85,
        diagnosis: 'ATENÇÃO: Seu corpo está em estado de inflamação crônica avançada. Isso significa que seu sistema imunológico está constantemente ativado, atacando seus próprios tecidos. A inflamação sistêmica está bloqueando completamente seu emagrecimento, destruindo sua energia e acelerando o envelhecimento.',
        symptoms: [
          'Impossibilidade de emagrecer independente da dieta',
          'Inchaço constante e sensação de estar "grávida"',
          'Fadiga extrema desde o momento que acorda',
          'Compulsão alimentar incontrolável',
          'Pele envelhecida, flácida ou com acne severa',
          'Dores articulares e musculares',
          'Insônia ou sono não reparador'
        ],
        consequences: [
          'Metabolismo travado em até 70%',
          'Risco ALTO de diabetes, hipertensão e doenças cardíacas',
          'Peso que só aumenta (ganho de 2-5kg por ano)',
          'Envelhecimento acelerado (aparenta 10+ anos a mais)',
          'Risco aumentado de câncer e Alzheimer',
          'Qualidade de vida severamente comprometida',
          'Hormônios completamente desregulados'
        ],
        whatToDo: 'URGENTE: Você precisa de um protocolo detox intensivo IMEDIATAMENTE. Cada dia sem ação é mais inflamação acumulada, mais peso ganho e mais risco à sua saúde. A boa notícia: a inflamação é reversível com o protocolo certo.',
        urgency: 'high'
      }
    }
  }

  // Mapear qual testemunho mostrar baseado na pergunta
  const getTestimonialIndex = () => {
    if (currentQuestion === 6) return 0; // Após pergunta 7
    if (currentQuestion === 9) return 1; // Após pergunta 10
    if (currentQuestion === 12) return 2; // Após pergunta 13
    return 0;
  }

  // Verificação de segurança
  if (currentScreen === 'quiz' && !questions[currentQuestion]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Carregando pergunta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={() => {
            setCurrentQuestion(0)
            setTotalScore(0)
            setSelectedOption(null)
            setShowQuickFeedback(false)
            setCurrentScreen('quiz')
          }} />
        )}
        
        {currentScreen === 'quiz' && questions[currentQuestion] && (
          <QuizScreen 
            key={`quiz-${currentQuestion}`}
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onOptionClick={handleOptionClick}
            onInputSubmit={handleInputSubmit}
            selectedOption={selectedOption}
            showQuickFeedback={showQuickFeedback}
            onContinue={handleQuickFeedbackContinue}
            activeUsers={activeUsers}
          />
        )}
        
        {currentScreen === 'testimonial' && (
          <TestimonialScreen 
            key={`testimonial-${currentQuestion}`}
            testimonial={testimonials[getTestimonialIndex()]}
            onContinue={handleTestimonialContinue}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        )}
        
        {currentScreen === 'result' && (
          <ResultScreen 
            key="result"
            score={totalScore}
            resultData={getResultData()}
            userData={userData}
            onContinue={() => setCurrentScreen('protocol')}
          />
        )}
        
        {currentScreen === 'protocol' && (
          <ProtocolScreen 
            key="protocol"
            resultData={getResultData()}
            userData={userData}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// WELCOME SCREEN COMPONENT
function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 py-12"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Hero Section with Image Placeholder */}
          <div className="relative bg-gradient-to-r from-rose-50 to-amber-50 p-12 text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-rose-200 to-amber-200"></div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6"
            >
              <Flame className="w-12 h-12 text-rose-500" />
            </motion.div>
            
            <h1 className="relative text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Por Que Você Não Consegue Emagrecer e Vive Inchada?
            </h1>
            
            <p className="relative text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Descubra o <span className="font-semibold text-rose-600">nível de inflamação</span> que está sabotando seu peso, causando inchaço e impedindo você de ter o corpo que deseja
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Seção: Por que fazer este quiz */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                A verdadeira razão pela qual você não emagrece
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed mb-4">
                Você faz dieta, malha, tenta de tudo... mas <span className="font-semibold text-rose-600">o peso não sai, a barriga continua inchada 
                e seu corpo não responde como deveria.</span> A culpa não é sua. É a <span className="font-bold text-rose-600">inflamação crônica</span>{' '}
                sabotando seu metabolismo.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                A inflamação bloqueia seus hormônios do emagrecimento, retém líquidos, destrói o colágeno da sua pele e faz você parecer 
                mais velha e pesada do que realmente é. <span className="font-semibold">E o pior: ela é invisível nos exames tradicionais.</span>{' '}
                Este quiz revela o que está impedindo você de ter o corpo que deseja.
              </p>
            </div>

            {/* Seção: Consequências da inflamação alta */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                    O que a inflamação alta está fazendo com seu corpo agora:
                  </h3>
                  <ul className="space-y-3 text-slate-700 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-1">•</span>
                      <span><strong>Bloqueia seu emagrecimento:</strong> Inflamação sabota hormônios como leptina e insulina, impedindo você de perder peso mesmo com dieta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-1">•</span>
                      <span><strong>Causa inchaço constante:</strong> Retenção de líquidos que faz você parecer e se sentir "pesada" o tempo todo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-1">•</span>
                      <span><strong>Envelhece sua pele:</strong> Destrói colágeno, causando flacidez, rugas e aquela aparência "cansada"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-1">•</span>
                      <span><strong>Acumula gordura abdominal:</strong> A inflamação faz seu corpo estocar gordura na barriga e cintura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-1">•</span>
                      <span><strong>Rouba sua energia:</strong> Por isso você acorda cansada e não tem disposição para nada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-1">•</span>
                      <span><strong>Aumenta risco de doenças:</strong> Diabetes, problemas cardíacos e outras condições graves começam com inflamação</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 mt-4 border-l-4 border-rose-500">
                <p className="text-slate-700 font-medium">
                  ⚠️ <strong>A boa notícia:</strong> A inflamação é reversível. Com o protocolo certo, você pode recuperar{' '}
                  sua energia, vitalidade e saúde em apenas 30 dias.
                </p>
              </div>
            </div>

            {/* Seção: O que você vai receber */}
            <div className="bg-gradient-to-r from-emerald-50 to-white border-l-4 border-emerald-500 p-6 md:p-8 rounded-2xl mb-8">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-3 text-xl md:text-2xl">
                <Sparkles className="w-7 h-7 text-emerald-600" />
                O que você vai receber ao finalizar o quiz:
              </h3>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800">Diagnóstico Preciso do Seu Nível de Inflamação</p>
                    <p className="text-slate-600">Classificação entre Baixo, Médio ou Crítico, com explicação detalhada do que está acontecendo no seu corpo</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800">Protocolo Personalizado Anti-Inflamatório</p>
                    <p className="text-slate-600">Plano estratégico específico para o SEU grau de inflamação, com os próximos passos para reverter o quadro</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800">Acesso ao Programa Detox 30 Dias</p>
                    <p className="text-slate-600">O método completo para desinflamar, recuperar energia, emagrecer naturalmente e rejuvenescer de dentro para fora</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Benefícios esperados */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                O que acontece quando você desinflamar:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-800">Emagrecimento natural</p>
                    <p className="text-slate-600 text-sm">Perca peso de verdade, sem efeito sanfona</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-800">Corpo desinchado</p>
                    <p className="text-slate-600 text-sm">Elimine a retenção e sinta-se leve de novo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-800">Barriga chapada</p>
                    <p className="text-slate-600 text-sm">Reduza a gordura abdominal e o inchaço</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-800">Pele radiante</p>
                    <p className="text-slate-600 text-sm">Rejuvenesça, recupere firmeza e viço natural</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-800">Energia para viver</p>
                    <p className="text-slate-600 text-sm">Acorde disposta e com vitalidade real</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
      <div>
                    <p className="font-semibold text-slate-800">Bem-estar completo</p>
                    <p className="text-slate-600 text-sm">Saúde, confiança e qualidade de vida</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Elementos de Confiança */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">10k+</div>
                <div className="text-xs text-slate-600">Mulheres transformadas</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">4.9/5</div>
                <div className="text-xs text-slate-600">Avaliação média</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">100%</div>
                <div className="text-xs text-slate-600">Garantia</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-2xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-xl"
            >
              Descobrir Por Que Não Consigo Emagrecer
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            
            <p className="text-sm text-slate-500 mt-4 text-center flex items-center justify-center gap-2">
              <span className="text-lg">⏱️</span> Leva apenas 3 minutos • <span className="text-lg">🔒</span> 100% gratuito • Sem cadastro
            </p>
            
            {/* Social Proof */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
              <Users className="w-4 h-4 text-rose-500" />
              <span>
                <span className="font-semibold text-rose-600">127 mulheres</span> estão fazendo o quiz agora
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// SLIDER INPUT COMPONENT
function SliderInput({ question, value, setValue, onContinue }) {
  // Definir ranges baseado no tipo
  const getRange = () => {
    if (question.type === 'weight') {
      return { min: 40, max: 150, step: 0.5, default: 70 }
    } else if (question.type === 'goalWeight') {
      return { min: 40, max: 120, step: 0.5, default: 60 }
    } else if (question.type === 'height') {
      return { min: 1.40, max: 2.00, step: 0.01, default: 1.65 }
    }
    return { min: 0, max: 100, step: 1, default: 50 }
  }

  const range = getRange()
  const currentValue = value ? parseFloat(value) : range.default

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value)
    const formattedValue = question.type === 'height' ? newValue.toFixed(2) : newValue.toFixed(1)
    setValue(formattedValue)
  }

  const handleInputChange = (e) => {
    let newValue = parseFloat(e.target.value)
    if (isNaN(newValue)) newValue = range.default
    if (newValue < range.min) newValue = range.min
    if (newValue > range.max) newValue = range.max
    const formattedValue = question.type === 'height' ? newValue.toFixed(2) : newValue.toFixed(1)
    setValue(formattedValue)
  }

  return (
    <div className="space-y-8">
      {/* Display do valor */}
      <div className="text-center">
        <div className="inline-flex items-baseline gap-2">
          <input
            type="number"
            value={currentValue}
            onChange={handleInputChange}
            min={range.min}
            max={range.max}
            step={range.step}
            className="text-6xl md:text-7xl font-bold text-slate-800 text-center bg-transparent border-none outline-none w-32 md:w-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-3xl md:text-4xl font-bold text-rose-600">{question.unit}</span>
        </div>
      </div>

      {/* Slider */}
      <div className="px-2">
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={currentValue}
          onChange={handleSliderChange}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${((currentValue - range.min) / (range.max - range.min)) * 100}%, #e2e8f0 ${((currentValue - range.min) / (range.max - range.min)) * 100}%, #e2e8f0 100%)`
          }}
        />
      </div>

      {/* Min e Max labels */}
      <div className="flex justify-between text-sm text-slate-500 px-2">
        <span>{range.min}{question.unit}</span>
        <span>{range.max}{question.unit}</span>
      </div>

      {/* Botão Continuar */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
      >
        Continuar
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

// QUIZ SCREEN COMPONENT
function QuizScreen({ question, questionNumber, totalQuestions, onOptionClick, onInputSubmit, selectedOption, showQuickFeedback, onContinue, activeUsers }) {
  const progress = (questionNumber / totalQuestions) * 100
  
  // Inicializar valor do slider baseado no tipo
  const getInitialValue = () => {
    if (question.type === 'weight') return '70'
    if (question.type === 'goalWeight') return '60'
    if (question.type === 'height') return '1.65'
    return ''
  }
  
  const [inputValue, setInputValue] = useState(getInitialValue())

  const handleInputButtonClick = () => {
    if (inputValue) {
      onInputSubmit(parseFloat(inputValue), question.type)
    }
  }

  if (!question) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen p-4 py-8 md:py-16"
    >
      {/* Progress Bar + Social Proof */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-3 font-medium">
          <span>Pergunta {questionNumber} de {totalQuestions}</span>
          <span className="text-rose-600">{Math.round(progress)}% concluído</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full shadow-sm"
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        {/* Social Proof */}
        {activeUsers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 text-xs text-slate-500"
          >
            <Users className="w-4 h-4 text-rose-500" />
            <span>
              <span className="font-semibold text-rose-600">{activeUsers}+ mulheres</span> estão descobrindo seu nível de inflamação agora
            </span>
          </motion.div>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12"
        >
          <div className="mb-3">
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
              Questão {questionNumber}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 leading-tight">
            {question.question}
          </h2>

          {/* Slider para peso/altura */}
          {(question.type === 'weight' || question.type === 'goalWeight' || question.type === 'height') && (
            <div className="max-w-2xl mx-auto">
              <SliderInput
                question={question}
                value={inputValue}
                setValue={setInputValue}
                onContinue={handleInputButtonClick}
              />
            </div>
          )}

          {/* Escolha visual do tipo de corpo */}
          {question.type === 'bodyGoal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOptionClick(option)}
                  className={`relative overflow-hidden rounded-2xl border-3 transition-all ${
                    selectedOption === option
                      ? 'border-rose-500 ring-4 ring-rose-200'
                      : 'border-slate-200 hover:border-rose-400'
                  }`}
                >
                  {/* Placeholder de imagem do corpo */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">
                        {option.value === 'lean' && '🧘‍♀️'}
                        {option.value === 'flat' && '💃'}
                        {option.value === 'toned' && '🏃‍♀️'}
                        {option.value === 'athletic' && '🏋️‍♀️'}
                      </div>
                      <div className="text-xs text-slate-400 mb-1">[ IMAGEM: {option.image} ]</div>
                    </div>
                  </div>
                  <div className={`p-4 text-center font-bold transition-colors ${
                    selectedOption === option
                      ? 'bg-rose-500 text-white'
                      : 'bg-white text-slate-800'
                  }`}>
                    {option.text}
                  </div>
                  {selectedOption === option && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-rose-500" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {/* Opções normais de múltipla escolha */}
          {!question.type && question.options && (
            <div className="space-y-4">
              {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: !showQuickFeedback ? 1.02 : 1, x: !showQuickFeedback ? 4 : 0 }}
                whileTap={{ scale: !showQuickFeedback ? 0.98 : 1 }}
                onClick={() => !showQuickFeedback && onOptionClick(option)}
                disabled={showQuickFeedback}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                  selectedOption === option
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50'
                } ${showQuickFeedback ? 'cursor-default opacity-70' : 'cursor-pointer group'} shadow-sm hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOption === option
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-slate-300 group-hover:border-rose-500 group-hover:bg-rose-500'
                  }`}>
                    <span className={`font-semibold ${
                      selectedOption === option
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-white'
                    }`}>{index + 1}</span>
                  </div>
                  <span className={`font-medium text-lg flex-1 ${
                    selectedOption === option
                      ? 'text-slate-900'
                      : 'text-slate-700 group-hover:text-slate-900'
                  }`}>
                    {option.text}
                  </span>
                  {selectedOption === option && (
                    <CheckCircle className="w-6 h-6 text-rose-500" />
                  )}
                  {!showQuickFeedback && selectedOption !== option && (
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-rose-500 transition-all" />
                  )}
                </div>
              </motion.button>
            ))}
            </div>
          )}

          {/* Feedback Rápido Inline ou Visual */}
          <AnimatePresence>
            {showQuickFeedback && question.feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mt-6"
              >
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg leading-relaxed font-medium">
                      {question.feedback}
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinue}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Próxima Pergunta
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Mensagens Motivacionais Variadas - aparecem estrategicamente */}
            {!showQuickFeedback && (() => {
              // Mensagens diferentes para diferentes momentos do quiz
              const motivationalMessages = {
                6: {
                  icon: Sparkles,
                  title: "Você Está no Caminho Certo!",
                  text: "Cada resposta nos ajuda a entender melhor seu corpo. Continue assim!",
                  subtext: "Analisando seus padrões de inflamação...",
                  color: "from-amber-500 to-orange-600"
                },
                8: {
                  icon: Target,
                  title: "Sua Transformação Está Sendo Criada",
                  text: "Com base nas suas respostas, estamos montando um plano único para você.",
                  subtext: "Personalizando seu protocolo detox...",
                  color: "from-emerald-500 to-teal-600"
                },
                10: {
                  icon: TrendingUp,
                  title: "Quase Lá! Você Está Quase Descobrindo Tudo",
                  text: "Faltam poucas perguntas para revelarmos seu nível de inflamação e criar seu plano personalizado.",
                  subtext: "Últimos ajustes no seu diagnóstico...",
                  color: "from-rose-500 to-pink-600"
                },
                12: {
                  icon: Heart,
                  title: "Última Pergunta! Seu Resultado Está Pronto",
                  text: "Estamos finalizando seu protocolo personalizado. Em instantes você verá sua transformação!",
                  subtext: "Gerando seu relatório completo...",
                  color: "from-purple-500 to-indigo-600"
                }
              }

              const message = motivationalMessages[questionNumber]
              
              if (message) {
                const IconComponent = message.icon
                return (
                  <motion.div
                    key={questionNumber}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6"
                  >
                    <div className={`bg-gradient-to-br ${message.color} rounded-xl p-6 text-white`}>
                      <div className="flex items-center gap-2 mb-3">
                        <IconComponent className="w-6 h-6" />
                        <h3 className="font-bold text-lg">{message.title}</h3>
                      </div>
                      <p className="text-white/90 mb-4">
                        {message.text}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <Zap className="w-4 h-4" />
                        <span>{message.subtext}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              }
              return null
            })()}
            
            {/* Feedback visual para escolha de corpo */}
            {showQuickFeedback && question.type === 'bodyGoal' && selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Heart className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg leading-relaxed font-medium">
                      Perfeito! Vamos criar um plano personalizado para você conquistar esse corpo <span className="font-bold text-emerald-700">{selectedOption.text}</span> de forma saudável!
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinue}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
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

// TESTIMONIAL SCREEN COMPONENT - Versão mais compacta e dinâmica
function TestimonialScreen({ testimonial, onContinue, questionNumber, totalQuestions }) {
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 py-8 md:py-16 bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-3 font-medium">
          <span>Pergunta {questionNumber} de {totalQuestions}</span>
          <span className="text-rose-600">{Math.round(progress)}% concluído</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full shadow-sm"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Header compacto */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
            </div>
            <h3 className="text-white font-bold text-xl">Resultado Real de Quem Desinflamou</h3>
          </div>

          <div className="p-8 md:p-10">
            {/* Image Placeholder compacto */}
            <div className="mb-6 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300">
              <div className="aspect-[16/9] flex items-center justify-center text-slate-400">
                <div className="text-center text-xs">
                  <div className="font-medium">[ FOTO: {testimonial.visual} ]</div>
                  <div className="mt-1">{testimonial.name}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-2xl font-bold text-slate-800 mb-3 text-center">
                "{testimonial.result}"
              </h4>
              
              {/* Dados específicos */}
              {(testimonial.weightLost || testimonial.waistReduction || testimonial.improvement) && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {testimonial.weightLost && (
                    <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200">
                      <div className="text-2xl font-bold text-emerald-700">{testimonial.weightLost}</div>
                      <div className="text-xs text-emerald-600">Peso perdido</div>
                    </div>
                  )}
                  {testimonial.waistReduction && (
                    <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200">
                      <div className="text-2xl font-bold text-emerald-700">{testimonial.waistReduction}</div>
                      <div className="text-xs text-emerald-600">Cintura reduzida</div>
                    </div>
                  )}
                  {testimonial.improvement && (
                    <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200 col-span-2">
                      <div className="text-2xl font-bold text-emerald-700">{testimonial.improvement}</div>
                      <div className="text-xs text-emerald-600">Melhoria</div>
                    </div>
                  )}
                  {testimonial.time && (
                    <div className="bg-rose-50 rounded-xl p-3 text-center border border-rose-200 col-span-2">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-rose-600" />
                        <div>
                          <div className="text-lg font-bold text-rose-700">{testimonial.time}</div>
                          <div className="text-xs text-rose-600">Para ver resultados</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Antes e Depois */}
              {testimonial.before && testimonial.after && (
                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-slate-500 mb-1">Antes:</div>
                      <div className="text-slate-700">{testimonial.before}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-600 mb-1">Depois:</div>
                      <div className="text-slate-700">{testimonial.after}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-slate-600 text-lg leading-relaxed text-center italic mb-3">
                {testimonial.text}
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="font-semibold text-slate-700">
                  {testimonial.name}
                </p>
                {testimonial.location && (
                  <span className="text-slate-500 text-sm">• {testimonial.location}</span>
                )}
              </div>
              
              {/* Estrelas */}
              <div className="flex justify-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
            >
              Continuar Avaliação
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// RESULT SCREEN COMPONENT - Redesenhado para Diagnóstico Detalhado
function ResultScreen({ score, resultData, userData, onContinue }) {
  const ResultIcon = resultData.icon
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      border: 'border-emerald-500',
      gradient: 'from-emerald-500 to-teal-600'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-500',
      gradient: 'from-amber-500 to-orange-600'
    },
    rose: {
      bg: 'bg-rose-100',
      text: 'text-rose-600',
      border: 'border-rose-500',
      gradient: 'from-rose-500 to-pink-600'
    }
  }
  
  const colors = colorClasses[resultData.color]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 py-8 md:py-12"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* SEU FUTURO - Visualização da Transformação */}
        {userData.currentWeight && userData.goalWeight && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl border border-emerald-400 overflow-hidden"
          >
            <div className="p-8 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8" />
                <h2 className="text-3xl md:text-4xl font-bold">Sua Jornada de Transformação</h2>
              </div>
              
              {/* Dados da Transformação */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
                  <div className="text-4xl font-bold mb-1">{userData.currentWeight}kg</div>
                  <div className="text-emerald-100">Peso Atual</div>
                </div>
                <div className="bg-white/30 backdrop-blur rounded-2xl p-5 text-center relative">
                  <ArrowRight className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-50" />
                  <div className="text-4xl font-bold mb-1 text-amber-300">-{weightToLose}kg</div>
                  <div className="text-emerald-100">A Eliminar</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
                  <div className="text-4xl font-bold mb-1">{userData.goalWeight}kg</div>
                  <div className="text-emerald-100">Peso Meta</div>
                </div>
              </div>

              {/* Timeline e Corpo Desejado */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Timeline */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Tempo Estimado</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{estimatedDays} dias</div>
                  <p className="text-emerald-100 text-sm">
                    Com o protocolo detox, você pode alcançar seu objetivo de forma saudável em aproximadamente {Math.ceil(estimatedDays / 30)} meses
                  </p>
                </div>

                {/* Corpo Desejado */}
                {userData.bodyGoal && (
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5" />
                      <h3 className="font-bold text-lg">Seu Corpo dos Sonhos</h3>
                    </div>
                    <div className="text-2xl font-bold mb-2">{bodyGoalNames[userData.bodyGoal]}</div>
                    <p className="text-emerald-100 text-sm">
                      Vamos criar o plano perfeito para você conquistar esse objetivo!
                    </p>
                  </div>
                )}
              </div>

              {/* Visualização do Corpo Desejado */}
              {userData.bodyGoal && (
                <div className="mt-6">
                  <h4 className="text-white font-bold mb-3 text-center">Seu Corpo dos Sonhos</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Antes */}
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                      <div className="text-xs text-white/70 mb-2">Antes</div>
                      <div className="text-2xl font-bold text-white">{userData.currentWeight}kg</div>
                      <div className="text-xs text-white/80 mt-1">Inflamação alta</div>
                    </div>
                    {/* Depois */}
                    <div className="bg-emerald-400/30 backdrop-blur rounded-xl p-4 border-2 border-emerald-300">
                      <div className="text-xs text-emerald-100 mb-2">Depois</div>
                      <div className="text-2xl font-bold text-white">{userData.goalWeight}kg</div>
                      <div className="text-xs text-emerald-100 mt-1">{bodyGoalNames[userData.bodyGoal]}</div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur border-2 border-dashed border-white/30">
                    <div className="aspect-video flex items-center justify-center text-white/80">
                      <div className="text-center p-4">
                        <div className="text-5xl mb-3">
                          {userData.bodyGoal === 'lean' && '🧘‍♀️'}
                          {userData.bodyGoal === 'flat' && '💃'}
                          {userData.bodyGoal === 'toned' && '🏃‍♀️'}
                          {userData.bodyGoal === 'athletic' && '🏋️‍♀️'}
                        </div>
                        <div className="text-sm font-medium">[ IMAGEM: Você com corpo {bodyGoalNames[userData.bodyGoal]} ]</div>
                        <div className="text-xs mt-2 opacity-80">Visualize-se conquistando esse resultado em {Math.ceil(estimatedDays / 30)} meses!</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Resultado da Inflamação */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header do Resultado */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-amber-500"></div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-2xl ${
                resultData.level === 'Baixo' ? 'bg-emerald-100' :
                resultData.level === 'Médio' ? 'bg-amber-100' :
                'bg-rose-100'
              }`}
            >
              <ResultIcon className={`w-12 h-12 ${resultData.color}`} />
            </motion.div>

            <h2 className={`relative text-3xl md:text-4xl font-bold mb-3 ${
              resultData.level === 'Baixo' ? 'text-emerald-400' :
              resultData.level === 'Médio' ? 'text-amber-400' :
              'text-rose-400'
            }`}>
              {resultData.title}
            </h2>
            
            <p className="relative text-white text-lg">
              Sua pontuação: <span className="font-bold">{score} de 60 pontos</span>
            </p>
          </div>

          {/* Conteúdo - Diagnóstico Completo */}
          <div className="p-8 md:p-12">
            
            {/* Barra de Porcentagem de Inflamação */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-600">Nível de Inflamação</span>
                <span className={`text-2xl font-bold ${colors.text}`}>{resultData.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${resultData.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-4 bg-gradient-to-r ${colors.gradient}`}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2 text-center">{resultData.subtitle}</p>
            </div>

            {/* Diagnóstico Detalhado */}
            <div className={`bg-gradient-to-r from-slate-50 to-white border-l-4 ${colors.border} p-6 md:p-8 rounded-2xl mb-8`}>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                📋 Seu Diagnóstico Completo
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                {resultData.diagnosis}
              </p>
            </div>

            {/* Sintomas que Você Apresenta */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-7 h-7 text-rose-600" />
                Sintomas Detectados
              </h3>
              <ul className="space-y-3">
                {resultData.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <span className="text-slate-700 text-lg">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consequências */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
                O Que Isso Está Causando no Seu Corpo
              </h3>
              <ul className="space-y-3">
                {resultData.consequences.map((consequence, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg">{consequence}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* O Que Fazer */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">
                {resultData.urgency === 'high' ? '🚨 AÇÃO URGENTE NECESSÁRIA' :
                 resultData.urgency === 'medium' ? '⚠️ Você Precisa Agir Agora' :
                 '✅ Próximo Passo Recomendado'}
              </h3>
              <p className="text-white/90 leading-relaxed text-lg">
                {resultData.whatToDo}
              </p>
            </div>

            {/* CTA Principal - Botão para ver o Protocolo */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all text-xl flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Quero Receber Meu Protocolo Personalizado Detox 30 Dias
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <p className="text-sm text-slate-500 mt-4">
                Clique para ver todos os detalhes do programa e como ele vai transformar sua saúde
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// PROTOCOL SCREEN COMPONENT - Versão Premium com Gráficos e Social Proof
function ProtocolScreen({ resultData, userData }) {
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
  
  const bodyGoalImages = {
    lean: "corpo-magro-definido-real",
    flat: "barriga-chapada-real",
    toned: "corpo-tonificado-curvas",
    athletic: "corpo-atletico-musculoso"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 py-8 md:py-12 bg-gradient-to-b from-rose-50/30 via-white to-purple-50/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Hero Section - Design Feminino e Premium */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 px-5 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            ✨ Protocolo Personalizado para Você
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Seu Plano Detox de 30 Dias
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Com base no seu nível de inflamação <span className="font-semibold text-rose-600">({resultData.level})</span>, 
            criamos o protocolo perfeito para você alcançar <span className="font-semibold text-purple-600">{userData.goalWeight}kg</span> e 
            conquistar o corpo <span className="font-semibold text-rose-600">{bodyGoalNames[userData.bodyGoal] || "dos seus sonhos"}</span>
          </p>
        </motion.div>

        {/* Gráfico de Evolução Personalizado - Design Feminino Wellness */}
        {userData.currentWeight && userData.goalWeight && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border border-rose-100 p-8 md:p-12 mb-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">
              Sua Jornada de Transformação Projetada
            </h2>
            
            {/* Gráfico Visual Simplificado */}
            <div className="bg-gradient-to-br from-rose-50/50 to-purple-50/50 rounded-2xl border border-rose-100/50 p-8 mb-6">
              <div className="relative">
                {/* Linha do Gráfico */}
                <div className="flex items-end justify-between h-48 relative">
                  {/* Ponto Inicial - HOJE */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="bg-gradient-to-br from-rose-200 to-rose-300 rounded-full w-24 h-24 flex items-center justify-center flex-col mb-4 border-4 border-white shadow-lg">
                      <div className="text-2xl font-bold text-rose-900">{userData.currentWeight}kg</div>
                      <div className="text-xs text-rose-800">HOJE</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-base text-slate-800">Você Hoje</div>
                      <div className="text-sm text-rose-600">Inflamação: {resultData.percentage}%</div>
                    </div>
                  </div>

                  {/* Linha de Progresso */}
                  <div className="flex-1 flex items-center mb-12">
                    <div className="w-full h-2 bg-rose-100 rounded-full relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-rose-400 via-purple-400 to-purple-500"
                      />
                    </div>
                    <ArrowRight className="w-8 h-8 mx-4 text-purple-400" />
                  </div>

                  {/* Ponto Final - META */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center flex-col mb-4 border-4 border-white shadow-lg">
                      <div className="text-2xl font-bold text-white">{userData.goalWeight}kg</div>
                      <div className="text-xs text-purple-100">{estimatedMonths} MESES</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-base text-slate-800">Você Transformada</div>
                      <div className="text-sm text-purple-600">Inflamação: 0-10%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dados da Transformação */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 text-center border border-rose-200 shadow-sm">
                  <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">-{weightToLose}kg</div>
                  <div className="text-xs text-slate-600 mt-1">Peso a Perder</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-purple-200 shadow-sm">
                  <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">{estimatedDays} dias</div>
                  <div className="text-xs text-slate-600 mt-1">Tempo Estimado</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-rose-200 shadow-sm">
                  <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">0.5kg/sem</div>
                  <div className="text-xs text-slate-600 mt-1">Perda Saudável</div>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-700 text-base">
              💜 Com o Protocolo Detox, você vai desinflamar progressivamente e emagrecer de forma saudável e sustentável
            </p>
          </motion.div>
        )}

        {/* Visualização do Corpo Desejado */}
        {userData.bodyGoal && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8 md:p-12 mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              ✨ Seu Objetivo: Corpo {bodyGoalNames[userData.bodyGoal]}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-3 mb-8 max-w-3xl mx-auto">
              {/* Imagem 1 */}
              <div className="rounded-lg overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300">
                <div className="aspect-[1/1] flex items-center justify-center text-slate-400">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-1">
                      {userData.bodyGoal === 'lean' && '🧘‍♀️'}
                      {userData.bodyGoal === 'flat' && '💃'}
                      {userData.bodyGoal === 'toned' && '🏃‍♀️'}
                      {userData.bodyGoal === 'athletic' && '🏋️‍♀️'}
                    </div>
                    <div className="text-[10px] font-medium leading-tight">[ FOTO 1: {bodyGoalImages[userData.bodyGoal]} ]</div>
                    <div className="text-[10px] mt-0.5 leading-tight">Mulher real</div>
                  </div>
                </div>
              </div>
              {/* Imagem 2 */}
              <div className="rounded-lg overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300">
                <div className="aspect-[1/1] flex items-center justify-center text-slate-400">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-1">✨</div>
                    <div className="text-[10px] font-medium leading-tight">[ FOTO 2: {bodyGoalImages[userData.bodyGoal]} ]</div>
                    <div className="text-[10px] mt-0.5 leading-tight">Ângulo diferente</div>
                  </div>
                </div>
              </div>
              {/* Imagem 3 */}
              <div className="rounded-lg overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300">
                <div className="aspect-[1/1] flex items-center justify-center text-slate-400">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-1">🌟</div>
                    <div className="text-[10px] font-medium leading-tight">[ FOTO 3: {bodyGoalImages[userData.bodyGoal]} ]</div>
                    <div className="text-[10px] mt-0.5 leading-tight">Corpo completo</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-lg text-slate-700 bg-emerald-50 p-6 rounded-xl border border-emerald-200">
              <strong>Este é o seu objetivo!</strong> Essas mulheres conquistaram o corpo {bodyGoalNames[userData.bodyGoal]} 
              seguindo o mesmo protocolo que você vai receber agora.
            </p>
          </motion.div>
        )}

        {/* O que é o Protocolo */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-rose-500" />
            O Que É o Protocolo Detox 30 Dias?
          </h2>
          
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            O Protocolo Detox 30 Dias é um programa completo e cientificamente validado de desintoxicação metabólica que vai reduzir sua inflamação de forma progressiva e segura, restaurar seu metabolismo e permitir que você finalmente emagreça de verdade.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-slate-800 mb-2">Específico</h3>
              <p className="text-sm text-slate-600">Personalizado para seu nível de inflamação</p>
            </div>
            <div className="text-center p-6 bg-rose-50 rounded-2xl border border-rose-200">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="font-bold text-slate-800 mb-2">Científico</h3>
              <p className="text-sm text-slate-600">Baseado em estudos validados</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-slate-800 mb-2">Completo</h3>
              <p className="text-sm text-slate-600">Tudo que você precisa em um lugar</p>
            </div>
          </div>
        </motion.div>

        {/* Testemunhos com Fotos e Vídeos */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            🌟 Mulheres Reais, Resultados Reais
          </h2>
          <p className="text-xl text-slate-700 mb-10 text-center max-w-3xl mx-auto">
            Mais de 10.000 mulheres já transformaram suas vidas. Veja os resultados:
          </p>

          {/* Grid de Testemunhos com Fotos */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Testemunho 1 - Com Foto Antes/Depois */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                <div className="bg-slate-100 border-r-2 border-dashed border-slate-300">
                  <div className="aspect-[3/4] flex items-center justify-center text-slate-400">
                    <div className="text-center p-4">
                      <div className="text-xs font-bold text-slate-500 mb-2">ANTES</div>
                      <div className="text-3xl mb-2">📷</div>
                      <div className="text-xs">[ FOTO: Mariana 78kg ]</div>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50">
                  <div className="aspect-[3/4] flex items-center justify-center text-slate-400">
                    <div className="text-center p-4">
                      <div className="text-xs font-bold text-emerald-700 mb-2">DEPOIS</div>
                      <div className="text-3xl mb-2">✨</div>
                      <div className="text-xs">[ FOTO: Mariana 66kg ]</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">
                  "Perdi 12kg em 45 dias!"
                </h3>
                <p className="text-slate-600 mb-3">
                  "Fazia dieta há 3 anos sem resultado. O protocolo desinflame meu corpo e finalmente emagreci de verdade!"
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  — Mariana Costa, 38 anos • São Paulo, SP
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">-12kg</span>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold">45 dias</span>
                </div>
              </div>
            </div>

            {/* Testemunho 2 - Com Foto Antes/Depois */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                <div className="bg-slate-100 border-r-2 border-dashed border-slate-300">
                  <div className="aspect-[3/4] flex items-center justify-center text-slate-400">
                    <div className="text-center p-4">
                      <div className="text-xs font-bold text-slate-500 mb-2">ANTES</div>
                      <div className="text-3xl mb-2">📷</div>
                      <div className="text-xs">[ FOTO: Camila 82kg ]</div>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50">
                  <div className="aspect-[3/4] flex items-center justify-center text-slate-400">
                    <div className="text-center p-4">
                      <div className="text-xs font-bold text-emerald-700 mb-2">DEPOIS</div>
                      <div className="text-3xl mb-2">✨</div>
                      <div className="text-xs">[ FOTO: Camila 67kg ]</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">
                  "Zerei a compulsão e perdi 15kg!"
                </h3>
                <p className="text-slate-600 mb-3">
                  "A compulsão por doces simplesmente sumiu quando desinflame. Emagreci naturalmente, sem sofrimento!"
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  — Camila Ferreira, 41 anos • Belo Horizonte, MG
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">-15kg</span>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold">60 dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vídeo Depoimentos */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Vídeo 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="relative bg-slate-900">
                <div className="aspect-video flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                    </div>
                    <div className="text-xs">[ VÍDEO: Depoimento Patricia ]</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-700">Patricia Almeida</p>
                <p className="text-xs text-slate-500">"Voltei a dormir como um bebê"</p>
              </div>
            </div>

            {/* Vídeo 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="relative bg-slate-900">
                <div className="aspect-video flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                    </div>
                    <div className="text-xs">[ VÍDEO: Depoimento Renata ]</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-700">Renata Lima</p>
                <p className="text-xs text-slate-500">"Barriga chapada em 50 dias"</p>
              </div>
            </div>

            {/* Vídeo 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="relative bg-slate-900">
                <div className="aspect-video flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                    </div>
                    <div className="text-xs">[ VÍDEO: Depoimento Juliana ]</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-700">Juliana Santos</p>
                <p className="text-xs text-slate-500">"Pele rejuvenesceu 10 anos"</p>
              </div>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-4xl font-bold text-rose-600 mb-2">10.127</div>
              <div className="text-sm text-slate-600">Mulheres Transformadas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-4xl font-bold text-emerald-600 mb-2">8.5kg</div>
              <div className="text-sm text-slate-600">Perda Média de Peso</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-4xl font-bold text-amber-600 mb-2">4.9/5</div>
              <div className="text-sm text-slate-600">Avaliação Média</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">97%</div>
              <div className="text-sm text-slate-600">Taxa de Sucesso</div>
            </div>
          </div>

          {/* CTA após Testemunhos */}
          <div className="mt-12 text-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#checkout"
              className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-2xl transition-all text-lg shadow-xl"
            >
              💚 Quero Meu Protocolo Detox por R$ 47 →
            </motion.a>
            <p className="text-sm text-slate-600 mt-4">
              ⏰ Oferta especial • Acesso por 12 meses • Garantia de 7 dias
            </p>
          </div>
        </motion.div>

        {/* Timeline de Resultados Esperados */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-100 to-rose-100 rounded-3xl shadow-lg border border-purple-200 p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-slate-900">
            📅 Sua Evolução Semana a Semana
          </h2>
          <p className="text-lg text-slate-700 mb-10 text-center max-w-3xl mx-auto">
            Veja exatamente o que você pode esperar em cada fase da sua transformação:
          </p>

          <div className="space-y-6">
            {/* Semana 1 */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-rose-400 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-rose-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl text-center shadow-lg">
                  <div className="text-xs font-semibold">SEMANA</div>
                  <div className="text-2xl">1</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">✨ Desintoxicação Inicial</h3>
                  <p className="text-slate-700 mb-3">
                    Redução visível do inchaço, melhora na digestão, energia começando a voltar. Você já pode perder 1-2kg de retenção líquida.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">✓ Menos Inchaço</span>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">✓ Digestão Melhor</span>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">✓ -1 a 2kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Semana 2 */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-400 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-rose-500 text-white font-bold px-6 py-3 rounded-xl text-center shadow-lg">
                  <div className="text-xs font-semibold">SEMANA</div>
                  <div className="text-2xl">2</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">💫 Reset Metabólico</h3>
                  <p className="text-slate-700 mb-3">
                    Compulsões diminuem drasticamente, sono melhora, clareza mental aumenta. A queima de gordura real começa.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">✓ Fim da Compulsão</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">✓ Sono Profundo</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">✓ Mente Clara</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Semana 3 */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-rose-400 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-rose-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl text-center shadow-lg">
                  <div className="text-xs font-semibold">SEMANA</div>
                  <div className="text-2xl">3</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">🌸 Transformação Visível</h3>
                  <p className="text-slate-700 mb-3">
                    Roupas mais folgadas, pele mais iluminada, elogios das pessoas ao redor. Perda de peso sustentável e saudável.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">✓ Roupas Folgadas</span>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">✓ Pele Radiante</span>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">✓ -3 a 5kg total</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Semana 4 */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-400 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-rose-500 text-white font-bold px-6 py-3 rounded-xl text-center shadow-lg">
                  <div className="text-xs font-semibold">SEMANA</div>
                  <div className="text-2xl">4+</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">💖 Consolidação e Hábito</h3>
                  <p className="text-slate-700 mb-3">
                    Protocolo vira estilo de vida. Corpo continua evoluindo, resultados se mantêm. Você se torna uma nova versão de si mesma.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">✓ Hábitos Criados</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">✓ Resultados Mantidos</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">✓ Corpo Transformado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <p className="text-lg font-bold mb-2 text-slate-800">
              💪 Em 30 dias, você não vai se reconhecer no espelho
            </p>
            <p className="text-slate-700">
              E o melhor: sem efeito sanfona, porque você terá desinflame de verdade
            </p>
          </div>
        </motion.div>

        {/* O que você recebe - Módulos */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl shadow-lg border border-rose-100 p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            🎁 O Que Você Recebe no Protocolo
          </h2>

          <div className="space-y-6">
            {/* Módulo 1 */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-rose-50 to-purple-50/50 rounded-2xl border border-rose-200">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Plano Alimentar Anti-Inflamatório Completo</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>30 dias de cardápio já montado (café, almoço, jantar e lanches)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Lista de compras semanal simplificada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>60+ receitas detox deliciosas e fáceis de fazer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Guia de substituições para adaptar ao seu gosto</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Módulo 2 */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50/50 to-rose-50 rounded-2xl border border-purple-200">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Protocolo de Suplementação Personalizado</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Lista exata de suplementos para seu nível de inflamação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Dosagens e horários otimizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Opções para todos os orçamentos</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Módulo 3 */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-rose-50 to-purple-50/50 rounded-2xl border border-rose-200">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Treinos Anti-Inflamatórios (Opcional)</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Rotina de exercícios de 20 minutos/dia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Vídeos demonstrativos de cada exercício</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Adaptado para iniciantes e avançadas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Módulo 4 */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50/50 to-rose-50 rounded-2xl border border-purple-200">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Monitoramento e Acompanhamento</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Check-ins semanais para acompanhar progresso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Planilha de evolução de peso e medidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Diário de sintomas para ver a melhora</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA após Módulos */}
          <div className="mt-10 text-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#checkout"
              className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-2xl transition-all text-lg shadow-xl"
            >
              💚 Quero Começar Minha Transformação por R$ 47 →
            </motion.a>
            <p className="text-sm text-slate-600 mt-4">
              🎯 Acesso imediato • 12 meses completos • Sem mensalidade
            </p>
          </div>
        </motion.div>

        {/* Suporte */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-100 to-rose-100 rounded-3xl shadow-lg border border-purple-200 p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">💜 Suporte Completo Durante Toda Jornada</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-purple-200 shadow-sm">
              <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Grupo Privado no WhatsApp</h3>
                <p className="text-slate-700 text-sm">Comunidade exclusiva de mulheres em transformação. Troque experiências, tire dúvidas e receba motivação diária.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-rose-200 shadow-sm">
              <Heart className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Suporte Nutricional</h3>
                <p className="text-slate-700 text-sm">Acesso a nutricionistas especializadas para esclarecer dúvidas sobre o protocolo e adaptações necessárias.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-purple-200 shadow-sm">
              <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Acesso por 12 Meses</h3>
                <p className="text-slate-700 text-sm">Faça e refaça quantas vezes quiser durante 12 meses. O protocolo completo está disponível para você.</p>
              </div>
            </div>
          </div>

          {/* CTA após Suporte */}
          <div className="mt-10 text-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#checkout"
              className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-2xl transition-all text-lg shadow-xl"
            >
              💚 Garantir Meu Acesso por R$ 47 →
            </motion.a>
            <p className="text-sm text-slate-700 mt-4">
              ✨ Transforme seu corpo e saúde • Começe hoje mesmo
            </p>
          </div>
        </motion.div>

        {/* CTA Final - Oferta Irresistível Feminina */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl border-2 border-rose-200 p-8 md:p-12 text-center mb-8"
        >
          <div className="inline-block bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-sm">
            ⚡ OFERTA ESPECIAL POR TEMPO LIMITADO
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            ✨ Comece Sua Transformação Hoje
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Mais de 10.000 mulheres já transformaram suas vidas com o Protocolo Detox 30 Dias. Agora é a sua vez!
          </p>

          {/* Preço Irresistível */}
          <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-8 mb-8 max-w-2xl mx-auto border-2 border-rose-200">
            <div className="mb-6">
              <div className="text-sm text-slate-600 mb-2">De <span className="line-through font-semibold">R$ 297</span></div>
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">R$ 47</span>
              </div>
              <div className="text-base text-slate-800 font-medium">Pagamento único • Acesso por 12 meses completos</div>
            </div>
            
            <div className="bg-amber-400 border-2 border-amber-300 rounded-xl p-4 mb-4 shadow-md">
              <div className="text-base font-bold text-amber-900 mb-1">
                💰 Economia de R$ 250 hoje
              </div>
              <div className="text-sm text-amber-900">
                Valor total: R$ 564 (12 meses) | Hoje você paga apenas R$ 47
              </div>
            </div>

            <div className="text-sm text-slate-600">
              Sem mensalidade • Acesso imediato • Garantia de 7 dias
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#checkout"
            className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-6 px-10 rounded-2xl transition-all text-xl shadow-xl mb-6 w-full max-w-md"
          >
            💚 SIM! Quero o Protocolo Detox por R$ 47 →
          </motion.a>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center gap-2 text-slate-700">
              <Shield className="w-5 h-5 text-rose-600" />
              <span>Garantia incondicional de 7 dias ou seu dinheiro de volta</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-700">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>Acesso imediato após o pagamento</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-700">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span>Acesso por 12 meses completos</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-rose-200">
            <p className="text-sm text-slate-600">
              ⏰ Esta oferta especial expira em breve. Garanta seu acesso agora!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default App
