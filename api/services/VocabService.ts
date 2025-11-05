/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VocabDTO } from '../models/VocabDTO';
import type { VocabDTOListApiResponse } from '../models/VocabDTOListApiResponse';
import type { VocabTopic } from '../models/VocabTopic';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VocabService {
    /**
     * @returns VocabDTOListApiResponse OK
     * @throws ApiError
     */
    public static getVocabRandom({
        count = 10,
    }: {
        count?: number,
    }): CancelablePromise<VocabDTOListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vocab/random',
            query: {
                'count': count,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putVocabAddToTopic({
        requestBody,
    }: {
        requestBody?: Array<VocabTopic>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vocab/add-to-topic',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putVocabRemoveFromTopic({
        requestBody,
    }: {
        requestBody?: Array<VocabTopic>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vocab/remove-from-topic',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postVocabImport({
        requestBody,
    }: {
        requestBody?: Array<VocabDTO>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vocab/import',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
