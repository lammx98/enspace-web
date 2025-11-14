/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfListOfdecimal } from '../models/ApiResponseOfListOfdecimal';
import type { ApiResponseOfUserWordProgressDto } from '../models/ApiResponseOfUserWordProgressDto';
import type { LearnRequestDto } from '../models/LearnRequestDto';
import type { ReviewRequestDto } from '../models/ReviewRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StudyService {
    /**
     * @returns ApiResponseOfUserWordProgressDto OK
     * @throws ApiError
     */
    public static postApiStudyLearn({
        requestBody,
    }: {
        requestBody: LearnRequestDto,
    }): CancelablePromise<ApiResponseOfUserWordProgressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Study/learn',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponseOfUserWordProgressDto OK
     * @throws ApiError
     */
    public static postApiStudyReview({
        requestBody,
    }: {
        requestBody: ReviewRequestDto,
    }): CancelablePromise<ApiResponseOfUserWordProgressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Study/review',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponseOfListOfdecimal OK
     * @throws ApiError
     */
    public static getApiStudyDue(): CancelablePromise<ApiResponseOfListOfdecimal> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Study/due',
        });
    }
}
