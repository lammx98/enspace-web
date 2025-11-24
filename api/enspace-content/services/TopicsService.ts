/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { TopicCreateRequest } from '../models/TopicCreateRequest';
import type { TopicDtoApiResponse } from '../models/TopicDtoApiResponse';
import type { TopicDtoListApiResponse } from '../models/TopicDtoListApiResponse';
import type { TopicUpdateRequest } from '../models/TopicUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicsService {
    /**
     * @returns TopicDtoListApiResponse OK
     * @throws ApiError
     */
    public static getApiV1ContentTopics(): CancelablePromise<TopicDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/content/topics',
        });
    }
    /**
     * @returns TopicDtoApiResponse OK
     * @throws ApiError
     */
    public static postApiV1ContentTopics({
        requestBody,
    }: {
        requestBody?: TopicCreateRequest,
    }): CancelablePromise<TopicDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/content/topics',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TopicDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiV1ContentTopics1({
        id,
    }: {
        id: number,
    }): CancelablePromise<TopicDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/content/topics/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns TopicDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiV1ContentTopics({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: TopicUpdateRequest,
    }): CancelablePromise<TopicDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/content/topics/{id}',
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
    public static deleteApiV1ContentTopics({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/content/topics/{id}',
            path: {
                'id': id,
            },
        });
    }
}
