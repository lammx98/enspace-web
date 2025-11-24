/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { WordCreateRequest } from '../models/WordCreateRequest';
import type { WordDtoApiResponse } from '../models/WordDtoApiResponse';
import type { WordDtoListApiResponse } from '../models/WordDtoListApiResponse';
import type { WordUpdateRequest } from '../models/WordUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WordsService {
    /**
     * @returns WordDtoListApiResponse OK
     * @throws ApiError
     */
    public static getApiV1ContentWords({
        lessonId,
    }: {
        lessonId?: number,
    }): CancelablePromise<WordDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/content/words',
            query: {
                'lessonId': lessonId,
            },
        });
    }
    /**
     * @returns WordDtoApiResponse OK
     * @throws ApiError
     */
    public static postApiV1ContentWords({
        requestBody,
    }: {
        requestBody?: WordCreateRequest,
    }): CancelablePromise<WordDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/content/words',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns WordDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiV1ContentWords1({
        id,
    }: {
        id: number,
    }): CancelablePromise<WordDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/content/words/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns WordDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiV1ContentWords({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: WordUpdateRequest,
    }): CancelablePromise<WordDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/content/words/{id}',
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
    public static deleteApiV1ContentWords({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/content/words/{id}',
            path: {
                'id': id,
            },
        });
    }
}
