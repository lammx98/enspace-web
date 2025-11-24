/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DecimalListApiResponse } from '../models/DecimalListApiResponse';
import type { LearnRequestDto } from '../models/LearnRequestDto';
import type { ReviewRequestDto } from '../models/ReviewRequestDto';
import type { UserWordProgressDtoApiResponse } from '../models/UserWordProgressDtoApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StudyService {
    /**
     * @returns UserWordProgressDtoApiResponse OK
     * @throws ApiError
     */
    public static postApiV1ProgressStudyLearn({
        requestBody,
    }: {
        requestBody?: LearnRequestDto,
    }): CancelablePromise<UserWordProgressDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/progress/Study/learn',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserWordProgressDtoApiResponse OK
     * @throws ApiError
     */
    public static postApiV1ProgressStudyReview({
        requestBody,
    }: {
        requestBody?: ReviewRequestDto,
    }): CancelablePromise<UserWordProgressDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/progress/Study/review',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns DecimalListApiResponse OK
     * @throws ApiError
     */
    public static getApiV1ProgressStudyDue(): CancelablePromise<DecimalListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/progress/Study/due',
        });
    }
}
