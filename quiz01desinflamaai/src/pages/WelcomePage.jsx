import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import Logo from '../components/Logo'

export default function WelcomePage() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/quiz/0')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-desinflama-cream via-desinflama-cream-100 to-white relative overflow-hidden"
    >
      {/* Background Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#2C5F5D_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      </div>

      <div className="max-w-xl w-full relative z-10 text-center">
        
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Logo className="mx-auto w-40" />
        </motion.div>

        {/* Headline Impactante */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-desinflama-teal mb-6 leading-[1.15] tracking-tight"
        >
          Seu corpo está <span className="text-desinflama-terracotta">inflamado?</span>
        </motion.h1>

        {/* Subheadline Persuasiva */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-desinflama-teal-700 mb-10 leading-relaxed font-medium"
        >
          Descubra em <span className="font-bold text-desinflama-terracotta">60 segundos</span> o nível de inflamação que está bloqueando seu emagrecimento e roubando sua energia.
        </motion.p>

        {/* Card CTA */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white p-2 rounded-3xl shadow-2xl shadow-desinflama-sage-200/50 border border-white/50 backdrop-blur-sm"
        >
          <button
            onClick={handleStart}
            className="group w-full bg-gradient-to-r from-desinflama-teal via-desinflama-teal-600 to-desinflama-sage hover:from-desinflama-teal-700 hover:to-desinflama-sage-600 text-white font-bold py-6 px-8 rounded-2xl transition-all shadow-lg hover:shadow-desinflama-teal/20 flex items-center justify-center gap-3 text-xl relative overflow-hidden"
          >
            {/* Efeito de brilho no botão */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>
            
            <span className="relative z-10">FAZER O TESTE GRATUITO</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Trust Indicators Sutis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-3 text-sm text-desinflama-sage-700 font-medium"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-desinflama-sage-200 border-2 border-white flex items-center justify-center text-[10px] text-desinflama-teal font-bold">
                  {['A', 'M', 'J'][i]}
                </div>
              ))}
            </div>
            <p><span className="text-desinflama-teal font-bold">127 mulheres</span> fazendo agora</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs opacity-80">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 100% Seguro</span>
            <span>•</span>
            <span>Sem cadastro inicial</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
