/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VocabDTOListApiResponse } from '../models/VocabDTOListApiResponse';
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
}
