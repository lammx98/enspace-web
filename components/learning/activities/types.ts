/**
 * Shared types for activity data structures based on ACTIVITY_GUIDE.md
 */

export type ActivityType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const ACTIVITY_TYPE = {
   WORD_TO_MEANING: 1,
   MEANING_TO_WORD: 2,
   WORD_TO_IMAGE: 3,
   IMAGE_TO_WORD: 4,
   FILL_BLANK: 5,
   REARRANGE_SENTENCE: 6,
   LISTEN_AND_CHOOSE: 7,
} as const;

export interface OptionText {
   text: string;
}

export interface OptionImage {
   image: string;
   text?: string;
}

// WORD_TO_MEANING, MEANING_TO_WORD
export interface ChooseTextData {
   question: string;
   options: OptionText[];
   correctIndex: number;
}

// WORD_TO_IMAGE
export interface WordToImageData {
   question: string;
   options: OptionImage[];
   correctIndex: number;
}

// IMAGE_TO_WORD
export interface ImageToWordData {
   image: string;
   options: OptionText[];
   correctIndex: number;
}

// FILL_BLANK
export interface FillBlankData {
   sentence: string;
   correctAnswer: string;
   hint?: string;
}

// REARRANGE_SENTENCE
export interface RearrangeSentenceData {
   words: string[];
   correctOrder: number[];
}

// LISTEN_AND_CHOOSE
export interface ListenAndChooseData {
   audio: string;
   question?: string;
   options: OptionText[];
   correctIndex: number;
}

export interface ActivityBaseProps {
   data: unknown;
   onCorrect?: () => void;
   onIncorrect?: () => void;
   onComplete?: () => void;
}
