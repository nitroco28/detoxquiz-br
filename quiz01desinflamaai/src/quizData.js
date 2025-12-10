// DADOS DO QUIZ - Perguntas focadas em emagrecimento + dados pessoais + objetivos
export const questions = [
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
    feedbackType: "imc"
  },
  {
    id: 4,
    question: "Que tipo de corpo você deseja alcançar?",
    type: "bodyGoal",
    options: [
      { text: "Magra", value: "lean", image: "corpo-magro-definido" },
      { text: "Fortalecida", value: "flat", image: "barriga-chapada" },
      { text: "Tonificado", value: "toned", image: "corpo-tonificado" },
      { text: "Com curvas", value: "athletic", image: "corpo-atletico" }
    ],
    feedbackType: "none"
  },
  {
    id: 5,
    question: "Você tem algum evento ou objetivo importante?",
    type: "motivation",
    options: [
      { text: "Casamento (meu ou de alguém próximo)", value: "wedding" },
      { text: "Viagem ou férias especiais", value: "travel" },
      { text: "Festa de aniversário importante", value: "birthday" },
      { text: "Evento profissional ou social", value: "professional" },
      { text: "Apenas quero me sentir bem comigo mesma", value: "wellness" },
      { text: "Não tenho evento específico", value: "none" }
    ],
    feedbackType: "quick",
    feedback: "💪 Ter um objetivo claro aumenta em 3x suas chances de sucesso! Vamos criar um plano para você chegar lá radiante e confiante."
  },
  {
    id: 6,
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
    id: 8,
    question: "Como está sua barriga durante o dia?",
    options: [
      { text: "Normal, sem inchaço", score: 0 },
      { text: "Acordo bem, mas incha após as refeições", score: 3 },
      { text: "Vivo inchada, parece que estou grávida", score: 5 }
    ],
    feedbackType: "quick",
    feedback: "💧 Inchaço abdominal constante é um dos principais sinais de inflamação intestinal e retenção de líquidos causada por toxinas."
  },
  {
    id: 9,
    question: "Você sente dores ou desconfortos frequentes?",
    options: [
      { text: "Não, me sinto bem", score: 0 },
      { text: "Às vezes, dores leves", score: 2 },
      { text: "Sim, dores frequentes em articulações ou músculos", score: 4 }
    ],
    feedbackType: "quick",
    feedback: "🦴 Dores articulares e musculares são sinais de inflamação sistêmica atacando seus tecidos."
  },
  {
    id: 10,
    question: "Como está seu sono?",
    options: [
      { text: "Durmo bem e acordo descansada", score: 0 },
      { text: "Durmo, mas acordo cansada", score: 2 },
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

// ============================================================================
// TESTEMUNHOS - Aparecem estrategicamente durante o quiz
// ============================================================================
// 
// COMO ADICIONAR NOVOS DEPOIMENTOS:
// 
// 1. Adicione o depoimento no array 'testimonials' abaixo (use o próximo índice disponível)
// 2. Adicione a imagem na pasta: /public/images/nome-da-imagem.png (ou .webp)
// 3. No campo 'image', coloque o caminho: "/images/nome-da-imagem.png"
// 4. Para que o depoimento apareça em uma pergunta específica:
//    a) Adicione 'feedbackType: "testimonial"' na pergunta desejada
//    b) Adicione o mapeamento abaixo: questionId: testimonialIndex
//
// EXEMPLO:
// - Adicionar depoimento de "Ana Silva" no índice 4:
//   {
//     id: 5,
//     name: "Ana Silva, 35 anos",
//     image: "/images/anasilva.png",  // <-- Imagem na pasta public/images/
//     ...
//   }
// - Fazer aparecer após a pergunta 11:
//   No testimonialMapping: 11: 4,  // Pergunta 11 -> Depoimento índice 4
//   Na pergunta 11: feedbackType: "testimonial"
//
// ============================================================================

// Mapeamento: questionId (da pergunta que ACIONA o depoimento) -> testimonialIndex
// Cada pergunta com feedbackType: "testimonial" DEVE ter uma entrada aqui
export const testimonialMapping = {
  10: 1, // "Como está seu sono?" -> Patricia Almeida (índice 1 - sleep improvement)
  13: 2, // "Você sente compulsão alimentar..." -> Camila Ferreira (índice 2 - compulsion)
  // Para adicionar mais: questionId: testimonialIndex,
}

export const testimonials = [
  {
    id: 1,
    name: "Mariana Costa, 38 anos",
    location: "São Paulo, SP",
    result: "Perdi 12kg e eliminei o inchaço em 45 dias",
    before: "78kg, barriga inchada, sem energia",
    after: "66kg, barriga chapada, energia total",
    text: "3 anos de dieta sem resultado. Era inflamação bloqueando meu metabolismo. Com o detox, em 45 dias perdi 12kg e minha barriga desinchou.",
    rating: 5,
    visual: "Barriga chapada e corpo definido",
    time: "45 dias",
    weightLost: "12kg",
    image: "/images/marianacosta.png"
  },
  {
    id: 2,
    name: "Patricia Almeida, 44 anos",
    location: "Rio de Janeiro, RJ",
    result: "Acabou a insônia e perdi peso após desinflamar",
    before: "Acordava 3x por noite, fadiga crônica, sem perder peso",
    after: "Durmo 8h seguidas, energia de manhã, peso caindo",
    text: "2 anos dormindo mal e sem emagrecer. Após desinflamar, voltei a dormir bem e o peso começou a cair naturalmente. Minha energia voltou completamente.",
    rating: 5,
    visual: "Rosto descansado e radiante",
    time: "26 dias",
    weightLost: "5kg",
    image: "/images/patriciaalmeida.png"
  },
  {
    id: 3,
    name: "Camila Ferreira, 41 anos",
    location: "Belo Horizonte, MG",
    result: "Zerei a compulsão por doces e perdi 15kg",
    before: "82kg, compulsão diária por doces",
    after: "67kg, zero compulsão, controle total",
    text: "Compulsão alimentar há 5 anos. O detox regulou meus hormônios e a vontade de doce sumiu. Perdi 15kg em 60 dias.",
    rating: 5,
    visual: "Transformação impressionante",
    time: "60 dias",
    weightLost: "15kg",
    image: "/images/marianacosta.png"
  },
  {
    id: 4,
    name: "Renata Lima, 36 anos",
    location: "Curitiba, PR",
    result: "Minha barriga finalmente desinflou",
    before: "Barriga de 95cm, inchaço constante",
    after: "Cintura de 72cm, barriga chapada",
    text: "Vivia inchada há anos. Era inflamação intestinal. Depois do programa, minha barriga ficou chapada. Reduzi 23cm de cintura.",
    rating: 5,
    visual: "Cintura fina e barriga definida",
    time: "50 dias",
    waistReduction: "23cm",
    image: null // Placeholder - adicionar imagem depois
  }
];





