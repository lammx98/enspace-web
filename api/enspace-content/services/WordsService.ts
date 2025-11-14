/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfListOfWordDto } from '../models/ApiResponseOfListOfWordDto';
import type { ApiResponseOfObject } from '../models/ApiResponseOfObject';
import type { ApiResponseOfWordDto } from '../models/ApiResponseOfWordDto';
import type { WordCreateRequest } from '../models/WordCreateRequest';
import type { WordUpdateRequest } from '../models/WordUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WordsService {
    /**
     * @returns ApiResponseOfListOfWordDto OK
     * @throws ApiError
     */
    public static getApiWords({
        lessonId,
    }: {
        lessonId?: number,
    }): CancelablePromise<ApiResponseOfListOfWordDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Words',
            query: {
                'lessonId': lessonId,
            },
        });
    }
    /**
     * @returns ApiResponseOfWordDto OK
     * @throws ApiError
     */
    public static postApiWords({
        requestBody,
    }: {
        requestBody: WordCreateRequest,
    }): CancelablePromise<ApiResponseOfWordDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Words',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponseOfWordDto OK
     * @throws ApiError
     */
    public static getApiWords1({
        id,
    }: {
        id: number,
    }): CancelablePromise<ApiResponseOfWordDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Words/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ApiResponseOfWordDto OK
     * @throws ApiError
     */
    public static putApiWords({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: WordUpdateRequest,
    }): CancelablePromise<ApiResponseOfWordDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Words/{id}',
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
    public static deleteApiWords({
        id,
    }: {
        id: number,
    }): CancelablePromise<ApiResponseOfObject> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Words/{id}',
            path: {
                'id': id,
            },
        });
    }
}
