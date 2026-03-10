/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityCreateRequest } from './ActivityCreateRequest';
import type { DifficultyDto } from './DifficultyDto';
export type LessonUpdateRequest = {
    topicId?: number;
    title?: string;
    difficulty?: DifficultyDto;
    order?: number;
    activities?: Array<ActivityCreateRequest> | null;
};

