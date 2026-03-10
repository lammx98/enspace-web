'use client';

import React from 'react';
import { WordToMeaning } from './WordToMeaning';
import { MeaningToWord } from './MeaningToWord';
import { WordToImage } from './WordToImage';
import { ImageToWord } from './ImageToWord';
import { FillBlank } from './FillBlank';
import { RearrangeSentence } from './RearrangeSentence';
import { ListenAndChoose } from './ListenAndChoose';
import { ACTIVITY_TYPE } from './types';
import type {
   ChooseTextData,
   WordToImageData,
   ImageToWordData,
   FillBlankData,
   RearrangeSentenceData,
   ListenAndChooseData,
} from './types';

export type ActivityType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ActivityRendererProps {
   type: ActivityType | number;
   data: unknown;
   onCorrect?: () => void;
   onIncorrect?: () => void;
   onComplete?: () => void;
}

export function ActivityRenderer({
   type,
   data,
   onCorrect,
   onIncorrect,
   onComplete,
}: ActivityRendererProps) {
   const activityType = Number(type) as ActivityType;

   switch (activityType) {
      case ACTIVITY_TYPE.WORD_TO_MEANING:
         return (
            <WordToMeaning
               data={data as ChooseTextData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      case ACTIVITY_TYPE.MEANING_TO_WORD:
         return (
            <MeaningToWord
               data={data as ChooseTextData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      case ACTIVITY_TYPE.WORD_TO_IMAGE:
         return (
            <WordToImage
               data={data as WordToImageData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      case ACTIVITY_TYPE.IMAGE_TO_WORD:
         return (
            <ImageToWord
               data={data as ImageToWordData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      case ACTIVITY_TYPE.FILL_BLANK:
         return (
            <FillBlank
               data={data as FillBlankData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      case ACTIVITY_TYPE.REARRANGE_SENTENCE:
         return (
            <RearrangeSentence
               data={data as RearrangeSentenceData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      case ACTIVITY_TYPE.LISTEN_AND_CHOOSE:
         return (
            <ListenAndChoose
               data={data as ListenAndChooseData}
               onCorrect={onCorrect}
               onIncorrect={onIncorrect}
               onComplete={onComplete}
            />
         );

      default:
         return (
            <div className="p-6 text-center text-muted-foreground">
               Loại activity không được hỗ trợ: {String(type)}
            </div>
         );
   }
}
