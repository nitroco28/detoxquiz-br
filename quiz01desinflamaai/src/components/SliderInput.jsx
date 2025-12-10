import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function SliderInput({ question, value, setValue, onContinue }) {
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
            className="text-6xl md:text-7xl font-bold text-desinflama-teal text-center bg-transparent border-none outline-none w-32 md:w-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-3xl md:text-4xl font-bold text-desinflama-terracotta">{question.unit}</span>
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
          className="w-full h-3 bg-desinflama-sage-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #C17F68 0%, #C17F68 ${((currentValue - range.min) / (range.max - range.min)) * 100}%, #E2E8F0 ${((currentValue - range.min) / (range.max - range.min)) * 100}%, #E2E8F0 100%)`
          }}
        />
      </div>

      {/* Min e Max labels */}
      <div className="flex justify-between text-sm text-desinflama-teal-600 px-2">
        <span>{range.min}{question.unit}</span>
        <span>{range.max}{question.unit}</span>
      </div>

      {/* Botão Continuar */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
      >
        Continuar
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}












