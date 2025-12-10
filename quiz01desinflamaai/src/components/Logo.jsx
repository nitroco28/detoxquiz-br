export default function Logo({ className = "w-32", showText = true }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Logo Icon - Simplified version */}
      <div className="relative">
        {showText ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              {/* Leaf icons representing the logo */}
              <div className="flex items-center">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left sage leaf */}
                  <path d="M10 30 Q5 25 8 15 Q10 10 15 12 Q18 14 15 20 Q12 26 10 30 Z" 
                        fill="#8FA39A" opacity="0.8"/>
                  
                  {/* Dark teal leaf */}
                  <path d="M20 28 Q15 20 18 10 Q20 5 25 8 Q28 11 25 18 Q22 25 20 28 Z" 
                        fill="#2C5F5D"/>
                  
                  {/* Terracotta flowing shape */}
                  <path d="M30 5 Q35 3 40 8 Q45 13 42 20 Q40 25 35 27 Q30 28 28 25 Q26 20 30 15 Q32 10 30 5 Z" 
                        fill="#C17F68"/>
                  
                  {/* Gold accent curve */}
                  <path d="M45 15 Q50 12 55 15 Q60 18 58 25 Q56 30 52 28 Q48 26 48 20 Q47 17 45 15 Z" 
                        fill="#B8955A" opacity="0.7"/>
                  
                  {/* Sage right leaf */}
                  <path d="M65 22 Q68 18 72 20 Q75 23 73 28 Q71 32 68 30 Q65 28 65 22 Z" 
                        fill="#8FA39A"/>
                </svg>
              </div>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-desinflama-teal tracking-tight">
                desinflama
              </span>
              <span className="text-2xl font-bold text-desinflama-sage">
                .ai
              </span>
            </div>
          </div>
        ) : (
          // Icon only version
          <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 40 Q5 30 8 18 Q10 12 18 15 Q22 18 18 28 Q14 35 10 40 Z" 
                  fill="#8FA39A" opacity="0.8"/>
            <path d="M20 38 Q15 25 18 12 Q20 6 28 10 Q32 14 28 25 Q24 35 20 38 Z" 
                  fill="#2C5F5D"/>
            <path d="M32 8 Q38 5 45 12 Q50 18 46 28 Q43 35 36 37 Q30 38 28 34 Q26 28 32 20 Q35 14 32 8 Z" 
                  fill="#C17F68"/>
            <path d="M48 20 Q53 16 58 20 Q62 24 59 32 Q56 38 50 35 Q46 32 46 26 Q45 22 48 20 Z" 
                  fill="#B8955A" opacity="0.7"/>
          </svg>
        )}
      </div>
    </div>
  )
}

