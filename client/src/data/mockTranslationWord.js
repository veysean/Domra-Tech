import { khnormal } from 'khmer-normalizer';

// Mock data with categories
export const mockWordTranslations = [
  {
    wordId: 1,
    EnglishWord: "Hello",
    FrenchWord: "Bonjour",
    KhmerWord: "សួស្តី",
    normalizedWord: khnormal("សួស្តី"),
    definition: "A greeting or expression of goodwill.",
    example: "Hello! How are you today?",
    reference: "Common daily greeting",
    category: "Data Science"
  },
  {
    wordId: 2,
    EnglishWord: "Water",
    FrenchWord: "Eau",
    KhmerWord: "ទឹក",
    normalizedWord: khnormal("ទឹក"),
    definition: "A clear liquid essential for life.",
    example: "I drink water every morning.",
    reference: "Basic necessity",
    category: "Data Science"
  },
  {
    wordId: 3,
    EnglishWord: "Book",
    FrenchWord: "Livre",
    KhmerWord: "សៀវភៅ",
    normalizedWord: khnormal("សៀវភៅ"),
    definition: "A set of pages with written or printed words.",
    example: "I borrowed a book from the library.",
    reference: "Library usage",
    category: "Programming"
  },
  {
    wordId: 4,
    EnglishWord: "Love",
    FrenchWord: "Amour",
    KhmerWord: "ស្នេហា",
    normalizedWord: khnormal("ស្នេហា"),
    definition: "A deep affection or care for someone or something.",
    example: "Love your family and friends.",
    reference: "Emotional concept",
    category: "AI & Machine Learning"
  },
  {
    wordId: 5,
    EnglishWord: "School",
    FrenchWord: "École",
    KhmerWord: "សាលា",
    normalizedWord: khnormal("សាលា"),
    definition: "A place for education.",
    example: "The children go to school every day.",
    reference: "Education institution",
    category: "Web Development"
  },
  {
    wordId: 6,
    EnglishWord: "Hello",
    FrenchWord: "Bonjour",
    KhmerWord: "សួស្តី",
    normalizedWord: khnormal("សួស្តី"),
    definition: "A greeting or expression of goodwill.",
    example: "Hello! How are you today?",
    reference: "Common daily greeting",
    category: "Computer Science"
  },
  {
    wordId: 7,
    EnglishWord: "Water",
    FrenchWord: "Eau",
    KhmerWord: "ទឹក",
    normalizedWord: khnormal("ទឹក"),
    definition: "A clear liquid essential for life.",
    example: "I drink water every morning.",
    reference: "Basic necessity",
    category: "Data Science"
  },
  {
    wordId: 8,
    EnglishWord: "Book",
    FrenchWord: "Livre",
    KhmerWord: "សៀវភៅ",
    normalizedWord: khnormal("សៀវភៅ"),
    definition: "A set of pages with written or printed words.",
    example: "I borrowed a book from the library.",
    reference: "Library usage",
    category: "Programming"
  },
  {
    wordId: 9,
    EnglishWord: "Love",
    FrenchWord: "Amour",
    KhmerWord: "ស្នេហា",
    normalizedWord: khnormal("ស្នេហា"),
    definition: "A deep affection or care for someone or something.",
    example: "Love your family and friends.",
    reference: "Emotional concept",
    category: "AI & Machine Learning"
  },
  {
    wordId: 10,
    EnglishWord: "School",
    FrenchWord: "École",
    KhmerWord: "សាលា",
    normalizedWord: khnormal("សាលា"),
    definition: "A place for education.",
    example: "The children go to school every day.",
    reference: "Education institution",
    category: "Web Development"
  }
];
