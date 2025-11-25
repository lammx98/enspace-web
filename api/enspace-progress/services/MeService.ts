/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatsDtoApiResponse } from '../models/StatsDtoApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MeService {
    /**
     * @returns StatsDtoApiResponse OK
     * @throws ApiError
     */
    public static getMeStats(): CancelablePromise<StatsDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Me/stats',
        });
    }
}
