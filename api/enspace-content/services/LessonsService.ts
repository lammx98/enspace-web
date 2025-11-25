/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonCreateRequest } from '../models/LessonCreateRequest';
import type { LessonDtoApiResponse } from '../models/LessonDtoApiResponse';
import type { LessonDtoListApiResponse } from '../models/LessonDtoListApiResponse';
import type { LessonUpdateRequest } from '../models/LessonUpdateRequest';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LessonsService {
    /**
     * @returns LessonDtoListApiResponse OK
     * @throws ApiError
     */
    public static getLessons({
        topicId,
    }: {
        topicId?: number,
    }): CancelablePromise<LessonDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons',
            query: {
                'topicId': topicId,
            },
        });
    }
    /**
     * @returns LessonDtoApiResponse OK
     * @throws ApiError
     */
    public static postLessons({
        requestBody,
    }: {
        requestBody?: LessonCreateRequest,
    }): CancelablePromise<LessonDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lessons',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LessonDtoApiResponse OK
     * @throws ApiError
     */
    public static getLessons1({
        id,
    }: {
        id: number,
    }): CancelablePromise<LessonDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns LessonDtoApiResponse OK
     * @throws ApiError
     */
    public static putLessons({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: LessonUpdateRequest,
    }): CancelablePromise<LessonDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/lessons/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteLessons({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lessons/{id}',
            path: {
                'id': id,
            },
        });
    }
}
