/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfLessonDto } from '../models/ApiResponseOfLessonDto';
import type { ApiResponseOfListOfLessonDto } from '../models/ApiResponseOfListOfLessonDto';
import type { ApiResponseOfObject } from '../models/ApiResponseOfObject';
import type { LessonCreateRequest } from '../models/LessonCreateRequest';
import type { LessonUpdateRequest } from '../models/LessonUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LessonsService {
    /**
     * @returns ApiResponseOfListOfLessonDto OK
     * @throws ApiError
     */
    public static getApiLessons({
        topicId,
    }: {
        topicId?: number,
    }): CancelablePromise<ApiResponseOfListOfLessonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Lessons',
            query: {
                'topicId': topicId,
            },
        });
    }
    /**
     * @returns ApiResponseOfLessonDto OK
     * @throws ApiError
     */
    public static postApiLessons({
        requestBody,
    }: {
        requestBody: LessonCreateRequest,
    }): CancelablePromise<ApiResponseOfLessonDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Lessons',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponseOfLessonDto OK
     * @throws ApiError
     */
    public static getApiLessons1({
        id,
    }: {
        id: number,
    }): CancelablePromise<ApiResponseOfLessonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Lessons/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ApiResponseOfLessonDto OK
     * @throws ApiError
     */
    public static putApiLessons({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: LessonUpdateRequest,
    }): CancelablePromise<ApiResponseOfLessonDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Lessons/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponseOfObject OK
     * @throws ApiError
     */
    public static deleteApiLessons({
        id,
    }: {
        id: number,
    }): CancelablePromise<ApiResponseOfObject> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Lessons/{id}',
            path: {
                'id': id,
            },
        });
    }
}
