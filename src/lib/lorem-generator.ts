// Frases de Lorem Ipsum para variar o conteúdo
const loremSentences = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  "Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
  "Donec eu libero sit amet quam egestas semper.",
  "Aenean ultricies mi vitae est.",
  "Mauris placerat eleifend leo.",
  "Quisque sit amet est et sapien ullamcorper pharetra.",
  "Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.",
  "Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.",
  "Donec non enim in turpis pulvinar facilisis.",
  "Ut felis.",
  "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.",
  "Aliquam erat volutpat.",
  "Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
];

// Frase clássica de Lorem Ipsum para começar
const classicFirstSentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

// Implementação determinística para evitar problemas de hidratação SSR/CSR
let seeded = false;
let clientOnly = false;

// Verificar se estamos no cliente 
if (typeof window !== 'undefined') {
  clientOnly = true;
}

/**
 * Gera uma única frase de Lorem Ipsum
 * @param startWithClassic Se deve começar com a frase clássica
 */
export function generateSingleSentence(startWithClassic: boolean = true): string {
  // Se foi solicitado para começar com a frase clássica, retorna ela
  if (startWithClassic) {
    return classicFirstSentence;
  }
  
  // Verificar se já estamos no modo cliente antes de usar aleatoriedade
  if (!seeded && !clientOnly) {
    // No servidor, sempre retorna a primeira frase para garantir consistência no SSR
    return loremSentences[0];
  }
  
  // No cliente, após a hidratação, podemos usar aleatoriedade
  seeded = true;
  const randomIndex = Math.floor(Math.random() * loremSentences.length);
  return loremSentences[randomIndex];
}

/**
 * Gera um número específico de parágrafos de Lorem Ipsum
 * @param count Número de parágrafos a serem gerados
 * @param startWithClassic Se o primeiro parágrafo deve começar com a frase clássica
 */
export function generateParagraphs(count: number = 3, startWithClassic: boolean = true): string[] {
  // Garante que o número de parágrafos seja pelo menos 1
  const paragraphCount = Math.max(1, count);
  
  const paragraphs: string[] = [];
  
  for (let i = 0; i < paragraphCount; i++) {
    // Para evitar problemas de hidratação SSR/CSR
    if (!seeded && !clientOnly) {
      // No servidor, usamos um número fixo de sentenças em ordem previsível
      const fixedSentences = loremSentences.slice(0, 5);
      paragraphs.push(fixedSentences.join(" "));
      continue;
    }
    
    seeded = true;
    
    // Se é o primeiro parágrafo e deve começar com a frase clássica
    if (i === 0 && startWithClassic) {
      // Para cada parágrafo, selecionamos um número aleatório de frases (entre 3 e 7)
      const sentenceCount = Math.floor(Math.random() * 5) + 3;
      let paragraph = classicFirstSentence + " ";
      
      // Garantimos que não repetimos frases consecutivas
      const usedIndices = new Set<number>();
      
      for (let j = 0; j < sentenceCount; j++) {
        let randomIndex: number;
        
        // Garantimos que não repetimos a mesma frase duas vezes seguidas
        do {
          randomIndex = Math.floor(Math.random() * loremSentences.length);
        } while ((usedIndices.has(randomIndex) || loremSentences[randomIndex] === classicFirstSentence) && usedIndices.size < loremSentences.length);
        
        usedIndices.add(randomIndex);
        paragraph += loremSentences[randomIndex] + " ";
      }
      
      paragraphs.push(paragraph.trim());
      continue;
    }
    
    // Para os demais parágrafos ou quando não começar com a frase clássica
    // Para cada parágrafo, selecionamos um número aleatório de frases (entre 4 e 8)
    const sentenceCount = Math.floor(Math.random() * 5) + 4;
    let paragraph = "";
    
    // Garantimos que não repetimos frases consecutivas
    const usedIndices = new Set<number>();
    
    for (let j = 0; j < sentenceCount; j++) {
      let randomIndex: number;
      
      // Garantimos que não repetimos a mesma frase duas vezes seguidas
      do {
        randomIndex = Math.floor(Math.random() * loremSentences.length);
      } while (usedIndices.has(randomIndex) && usedIndices.size < loremSentences.length);
      
      usedIndices.add(randomIndex);
      paragraph += loremSentences[randomIndex] + " ";
    }
    
    paragraphs.push(paragraph.trim());
  }
  
  return paragraphs;
} 