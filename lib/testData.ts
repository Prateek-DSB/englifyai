export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestQuestion {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export interface WATPrompt {
  difficulty: Difficulty;
  prompt: string;
}

export interface TestData {
  [key: string]: {
    questions: TestQuestion[];
    watPrompt: string;
  };
}

export const testData: TestData = {
  easy: {
    questions: [
      {
        id: 1,
        question: "What is the past tense of 'go'?",
        options: {
          a: "goed",
          b: "went",
          c: "gone",
          d: "going"
        },
        correctAnswer: "b"
      },
      {
        id: 2,
        question: "Choose the correct article: ___ apple is red.",
        options: {
          a: "A",
          b: "An",
          c: "The",
          d: "No article"
        },
        correctAnswer: "b"
      },
      {
        id: 3,
        question: "What is the plural of 'child'?",
        options: {
          a: "childs",
          b: "childes",
          c: "children",
          d: "child"
        },
        correctAnswer: "c"
      },
      {
        id: 4,
        question: "Choose the correct preposition: I am good ___ English.",
        options: {
          a: "in",
          b: "at",
          c: "on",
          d: "with"
        },
        correctAnswer: "b"
      },
      {
        id: 5,
        question: "What does 'beautiful' mean?",
        options: {
          a: "ugly",
          b: "pretty",
          c: "sad",
          d: "angry"
        },
        correctAnswer: "b"
      },
      {
        id: 6,
        question: "Choose the correct form: She ___ to school every day.",
        options: {
          a: "go",
          b: "goes",
          c: "going",
          d: "gone"
        },
        correctAnswer: "b"
      },
      {
        id: 7,
        question: "What is the opposite of 'hot'?",
        options: {
          a: "warm",
          b: "cool",
          c: "cold",
          d: "mild"
        },
        correctAnswer: "c"
      },
      {
        id: 8,
        question: "Choose the correct pronoun: ___ is my friend.",
        options: {
          a: "Him",
          b: "His",
          c: "He",
          d: "Her"
        },
        correctAnswer: "c"
      },
      {
        id: 9,
        question: "What is the comparative form of 'good'?",
        options: {
          a: "gooder",
          b: "better",
          c: "best",
          d: "more good"
        },
        correctAnswer: "b"
      },
      {
        id: 10,
        question: "Choose the correct spelling:",
        options: {
          a: "recieve",
          b: "receive",
          c: "receve",
          d: "receiv"
        },
        correctAnswer: "b"
      },
      {
        id: 11,
        question: "What type of word is 'quickly'?",
        options: {
          a: "noun",
          b: "verb",
          c: "adjective",
          d: "adverb"
        },
        correctAnswer: "d"
      },
      {
        id: 12,
        question: "Choose the correct sentence:",
        options: {
          a: "I have much friends",
          b: "I have many friends",
          c: "I have lot friends",
          d: "I have plenty friends"
        },
        correctAnswer: "b"
      },
      {
        id: 13,
        question: "What is the past participle of 'eat'?",
        options: {
          a: "ate",
          b: "eating",
          c: "eaten",
          d: "eated"
        },
        correctAnswer: "c"
      },
      {
        id: 14,
        question: "Choose the correct question word: ___ are you?",
        options: {
          a: "What",
          b: "Where",
          c: "How",
          d: "When"
        },
        correctAnswer: "c"
      },
      {
        id: 15,
        question: "What does 'library' mean?",
        options: {
          a: "a place to buy books",
          b: "a place to borrow books",
          c: "a place to write books",
          d: "a place to burn books"
        },
        correctAnswer: "b"
      }
    ],
    watPrompt: "Describe your favorite season in 150-200 words. Explain what makes this season special to you, how it affects your mood, and what activities you enjoy during this time."
  },
  medium: {
    questions: [
      {
        id: 1,
        question: "Choose the correct conditional: If I ___ rich, I would travel the world.",
        options: {
          a: "am",
          b: "was",
          c: "were",
          d: "will be"
        },
        correctAnswer: "c"
      },
      {
        id: 2,
        question: "What is the meaning of 'ubiquitous'?",
        options: {
          a: "rare",
          b: "everywhere",
          c: "beautiful",
          d: "expensive"
        },
        correctAnswer: "b"
      },
      {
        id: 3,
        question: "Choose the correct passive voice: The teacher explains the lesson.",
        options: {
          a: "The lesson is explained by the teacher",
          b: "The lesson was explained by the teacher",
          c: "The lesson explains by the teacher",
          d: "The lesson will explain by the teacher"
        },
        correctAnswer: "a"
      },
      {
        id: 4,
        question: "What type of clause is underlined: 'The book that I read was interesting'?",
        options: {
          a: "noun clause",
          b: "adverb clause",
          c: "adjective clause",
          d: "independent clause"
        },
        correctAnswer: "c"
      },
      {
        id: 5,
        question: "Choose the correct subjunctive: I suggest that he ___ early.",
        options: {
          a: "comes",
          b: "come",
          c: "came",
          d: "coming"
        },
        correctAnswer: "b"
      },
      {
        id: 6,
        question: "What is the meaning of 'procrastinate'?",
        options: {
          a: "to hurry up",
          b: "to delay",
          c: "to finish quickly",
          d: "to organize"
        },
        correctAnswer: "b"
      },
      {
        id: 7,
        question: "Choose the correct reported speech: He said, 'I am tired.'",
        options: {
          a: "He said that he is tired",
          b: "He said that he was tired",
          c: "He said that he will be tired",
          d: "He said that he has been tired"
        },
        correctAnswer: "b"
      },
      {
        id: 8,
        question: "What is a synonym for 'meticulous'?",
        options: {
          a: "careless",
          b: "careful",
          c: "quick",
          d: "lazy"
        },
        correctAnswer: "b"
      },
      {
        id: 9,
        question: "Choose the correct gerund usage: I enjoy ___ books.",
        options: {
          a: "read",
          b: "to read",
          c: "reading",
          d: "reads"
        },
        correctAnswer: "c"
      },
      {
        id: 10,
        question: "What is the meaning of 'ambiguous'?",
        options: {
          a: "clear",
          b: "unclear",
          c: "loud",
          d: "quiet"
        },
        correctAnswer: "b"
      },
      {
        id: 11,
        question: "Choose the correct phrasal verb: Please ___ the lights before leaving.",
        options: {
          a: "turn off",
          b: "turn on",
          c: "turn up",
          d: "turn down"
        },
        correctAnswer: "a"
      },
      {
        id: 12,
        question: "What is the correct form: Neither John nor Mary ___ coming.",
        options: {
          a: "are",
          b: "is",
          c: "were",
          d: "have"
        },
        correctAnswer: "b"
      },
      {
        id: 13,
        question: "Choose the correct preposition: She is allergic ___ cats.",
        options: {
          a: "with",
          b: "from",
          c: "to",
          d: "of"
        },
        correctAnswer: "c"
      },
      {
        id: 14,
        question: "What does 'eloquent' mean?",
        options: {
          a: "silent",
          b: "fluent and persuasive",
          c: "confused",
          d: "angry"
        },
        correctAnswer: "b"
      },
      {
        id: 15,
        question: "Choose the correct modal: You ___ have told me earlier.",
        options: {
          a: "should",
          b: "would",
          c: "could",
          d: "might"
        },
        correctAnswer: "a"
      }
    ],
    watPrompt: "Discuss the impact of social media on modern communication. Analyze both positive and negative effects, and provide your opinion on whether social media has improved or hindered human interaction."
  },
  hard: {
    questions: [
      {
        id: 1,
        question: "Choose the correct usage: The data ___ conclusive evidence.",
        options: {
          a: "provides",
          b: "provide",
          c: "providing",
          d: "provided"
        },
        correctAnswer: "b"
      },
      {
        id: 2,
        question: "What is the meaning of 'perspicacious'?",
        options: {
          a: "confused",
          b: "having keen insight",
          c: "stubborn",
          d: "generous"
        },
        correctAnswer: "b"
      },
      {
        id: 3,
        question: "Choose the correct subjunctive mood: If I ___ you, I would reconsider.",
        options: {
          a: "am",
          b: "was",
          c: "were",
          d: "will be"
        },
        correctAnswer: "c"
      },
      {
        id: 4,
        question: "What type of error is in: 'Between you and I, this is confidential'?",
        options: {
          a: "subject-verb disagreement",
          b: "incorrect pronoun case",
          c: "dangling modifier",
          d: "split infinitive"
        },
        correctAnswer: "b"
      },
      {
        id: 5,
        question: "Choose the correct form: The number of students ___ increasing.",
        options: {
          a: "are",
          b: "is",
          c: "were",
          d: "have been"
        },
        correctAnswer: "b"
      },
      {
        id: 6,
        question: "What does 'sanguine' mean?",
        options: {
          a: "pessimistic",
          b: "optimistic",
          c: "angry",
          d: "confused"
        },
        correctAnswer: "b"
      },
      {
        id: 7,
        question: "Identify the rhetorical device: 'The pen is mightier than the sword.'",
        options: {
          a: "metaphor",
          b: "simile",
          c: "metonymy",
          d: "hyperbole"
        },
        correctAnswer: "c"
      },
      {
        id: 8,
        question: "Choose the correct parallel structure:",
        options: {
          a: "She likes reading, writing, and to paint",
          b: "She likes reading, writing, and painting",
          c: "She likes to read, writing, and painting",
          d: "She likes reading, to write, and painting"
        },
        correctAnswer: "b"
      },
      {
        id: 9,
        question: "What is the meaning of 'obsequious'?",
        options: {
          a: "rebellious",
          b: "excessively eager to please",
          c: "intelligent",
          d: "mysterious"
        },
        correctAnswer: "b"
      },
      {
        id: 10,
        question: "Choose the correct conditional: Had I known earlier, I ___ differently.",
        options: {
          a: "would act",
          b: "would have acted",
          c: "will act",
          d: "acted"
        },
        correctAnswer: "b"
      },
      {
        id: 11,
        question: "What is a 'zeugma'?",
        options: {
          a: "a type of rhyme",
          b: "using one word to modify two others in different senses",
          c: "a form of alliteration",
          d: "a type of meter"
        },
        correctAnswer: "b"
      },
      {
        id: 12,
        question: "Choose the correct usage: The committee ___ in agreement.",
        options: {
          a: "are",
          b: "is",
          c: "were",
          d: "have"
        },
        correctAnswer: "b"
      },
      {
        id: 13,
        question: "What does 'pusillanimous' mean?",
        options: {
          a: "brave",
          b: "cowardly",
          c: "generous",
          d: "intelligent"
        },
        correctAnswer: "b"
      },
      {
        id: 14,
        question: "Identify the error: 'Hopefully, the weather will improve tomorrow.'",
        options: {
          a: "misplaced modifier",
          b: "incorrect adverb usage",
          c: "subject-verb disagreement",
          d: "no error"
        },
        correctAnswer: "b"
      },
      {
        id: 15,
        question: "Choose the correct form: Each of the students ___ responsible for their own work.",
        options: {
          a: "are",
          b: "is",
          c: "were",
          d: "have been"
        },
        correctAnswer: "b"
      }
    ],
    watPrompt: "Critically analyze the statement: 'Technology has made human beings more isolated despite being more connected than ever.' Discuss the paradox of modern connectivity, examine the psychological and sociological implications, and propose potential solutions to bridge the gap between digital connection and genuine human interaction."
  }
};

export function getTestQuestions(difficulty: Difficulty): TestQuestion[] {
  return testData[difficulty]?.questions || [];
}

export function getWATPrompt(difficulty: Difficulty): string {
  return testData[difficulty]?.watPrompt || '';
}
