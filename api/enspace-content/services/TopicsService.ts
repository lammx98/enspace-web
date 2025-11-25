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
    public static getTopics(): CancelablePromise<TopicDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/topics',
        });
    }
    /**
     * @returns TopicDtoApiResponse OK
     * @throws ApiError
     */
    public static postTopics({
        requestBody,
    }: {
        requestBody?: TopicCreateRequest,
    }): CancelablePromise<TopicDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/topics',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TopicDtoApiResponse OK
     * @throws ApiError
     */
    public static getTopics1({
        id,
    }: {
        id: number,
    }): CancelablePromise<TopicDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/topics/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns TopicDtoApiResponse OK
     * @throws ApiError
     */
    public static putTopics({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: TopicUpdateRequest,
    }): CancelablePromise<TopicDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/topics/{id}',
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
    public static deleteTopics({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/topics/{id}',
            path: {
                'id': id,
            },
        });
    }
}
