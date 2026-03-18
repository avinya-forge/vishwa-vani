/**
 * Vishwa-Vani: Wisdom & Trivia Engine 💡
 * 
 * Curated facts and scholarly insights to enrich the reading experience.
 */

export const VEDIC_WISDOM_FACTS = [
  { text: 'The Bhagavad Gita is known as Gītopaniṣad because it contains the essence of all 108 Upanishads.', source: 'Traditional' },
  { text: 'Sanskrit, the language of the Vedas, is considered by many linguists as the most systematic and scientific language for computer algorithms.', source: 'NASA Forbes, 1987' },
  { text: 'The Rigveda consists of 1,028 hymns (Suktas) organized into ten books known as Mandalas.', source: 'Historical' },
  { text: 'The word "Dharma" comes from the root "Dhṛ", meaning "to uphold" or "to support" the cosmic order.', source: 'Linguistic' },
  { text: 'Adi Shankaracharya established four Mathas (monasteries) in the four corners of India to preserve the Advaita Vedanta tradition.', source: 'Historical' },
  { text: 'The Mahabharata, with over 100,000 Shlokas, is the longest epic poem ever written—about ten times the size of the Iliad and Odyssey combined.', source: 'Guinness Records' },
  { text: 'The Upanishads are called Vedanta because they represent the "Anta" (end or culmination) of Vedic knowledge.', source: 'Philosophical' },
  { text: 'Vedic mathematics uses sixteen Sutras (formulas) that allow for mental calculations at lightning speed.', source: 'Science' },
  { text: 'The 18 Maha Puranas are divided into three groups of six, corresponding to the three Gunas: Sattva, Rajas, and Tamas.', source: 'Theological' },
  { text: 'The concept of "Zero" (Shunya) and the decimal system are fundamentally rooted in Vedic philosophical emptiness.', source: 'History of Science' },
];

/** 
 * Returns a deterministic "Daily Fact" based on the current date or random seed.
 */
export function getDailyWisdom() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % VEDIC_WISDOM_FACTS.length;
  return VEDIC_WISDOM_FACTS[index];
}
