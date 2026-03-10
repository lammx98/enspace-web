/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImportResultApiResponse } from '../models/ImportResultApiResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { WordCreateRequest } from '../models/WordCreateRequest';
import type { WordDtoApiResponse } from '../models/WordDtoApiResponse';
import type { WordDtoListApiResponse } from '../models/WordDtoListApiResponse';
import type { WordImportData } from '../models/WordImportData';
import type { WordImportDataListApiResponse } from '../models/WordImportDataListApiResponse';
import type { WordSearchDtoListApiResponse } from '../models/WordSearchDtoListApiResponse';
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
     * @returns WordSearchDtoListApiResponse OK
     * @throws ApiError
     */
    public static getWordsSearch({
        text,
        size = 10,
    }: {
        text?: string,
        size?: number,
    }): CancelablePromise<WordSearchDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/words/search',
            query: {
                'text': text,
                'size': size,
            },
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
    /**
     * @returns WordImportDataListApiResponse OK
     * @throws ApiError
     */
    public static postWordsImportPreview({
        formData,
    }: {
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<WordImportDataListApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/words/import/preview',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @returns ImportResultApiResponse OK
     * @throws ApiError
     */
    public static postWordsImportConfirm({
        requestBody,
    }: {
        requestBody?: Array<WordImportData>,
    }): CancelablePromise<ImportResultApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/words/import/confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
