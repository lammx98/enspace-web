/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfStatsDto } from '../models/ApiResponseOfStatsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MeService {
    /**
     * @returns ApiResponseOfStatsDto OK
     * @throws ApiError
     */
    public static getApiMeStats(): CancelablePromise<ApiResponseOfStatsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Me/stats',
        });
    }
}
