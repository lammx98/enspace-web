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
    public static getWords({
        lessonId,
    }: {
        lessonId?: number,
    }): CancelablePromise<WordDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/words',
            query: {
                'lessonId': lessonId,
            },
        });
    }
    /**
     * @returns WordDtoApiResponse OK
     * @throws ApiError
     */
    public static postWords({
        requestBody,
    }: {
        requestBody?: WordCreateRequest,
    }): CancelablePromise<WordDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/words',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns WordDtoApiResponse OK
     * @throws ApiError
     */
    public static getWords1({
        id,
    }: {
        id: number,
    }): CancelablePromise<WordDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/words/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns WordDtoApiResponse OK
     * @throws ApiError
     */
    public static putWords({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: WordUpdateRequest,
    }): CancelablePromise<WordDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/words/{id}',
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
    public static deleteWords({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/words/{id}',
            path: {
                'id': id,
            },
        });
    }
}
