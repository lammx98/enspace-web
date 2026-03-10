/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityCreateRequest } from '../models/ActivityCreateRequest';
import type { ActivityDtoApiResponse } from '../models/ActivityDtoApiResponse';
import type { ActivityDtoListApiResponse } from '../models/ActivityDtoListApiResponse';
import type { ActivityUpdateRequest } from '../models/ActivityUpdateRequest';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActivitiesService {
    /**
     * @returns ActivityDtoListApiResponse OK
     * @throws ApiError
     */
    public static getLessonsActivities({
        lessonId,
    }: {
        lessonId: number,
    }): CancelablePromise<ActivityDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/{lessonId}/activities',
            path: {
                'lessonId': lessonId,
            },
        });
    }
    /**
     * @returns ActivityDtoApiResponse OK
     * @throws ApiError
     */
    public static postLessonsActivities({
        lessonId,
        requestBody,
    }: {
        lessonId: number,
        requestBody?: ActivityCreateRequest,
    }): CancelablePromise<ActivityDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lessons/{lessonId}/activities',
            path: {
                'lessonId': lessonId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ActivityDtoApiResponse OK
     * @throws ApiError
     */
    public static getLessonsActivities1({
        lessonId,
        id,
    }: {
        lessonId: number,
        id: number,
    }): CancelablePromise<ActivityDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/{lessonId}/activities/{id}',
            path: {
                'lessonId': lessonId,
                'id': id,
            },
        });
    }
    /**
     * @returns ActivityDtoApiResponse OK
     * @throws ApiError
     */
    public static putLessonsActivities({
        lessonId,
        id,
        requestBody,
    }: {
        lessonId: number,
        id: number,
        requestBody?: ActivityUpdateRequest,
    }): CancelablePromise<ActivityDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/lessons/{lessonId}/activities/{id}',
            path: {
                'lessonId': lessonId,
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
    public static deleteLessonsActivities({
        lessonId,
        id,
    }: {
        lessonId: number,
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lessons/{lessonId}/activities/{id}',
            path: {
                'lessonId': lessonId,
                'id': id,
            },
        });
    }
}
