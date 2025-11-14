/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfListOfTopicDto } from '../models/ApiResponseOfListOfTopicDto';
import type { ApiResponseOfObject } from '../models/ApiResponseOfObject';
import type { ApiResponseOfTopicDto } from '../models/ApiResponseOfTopicDto';
import type { TopicCreateRequest } from '../models/TopicCreateRequest';
import type { TopicUpdateRequest } from '../models/TopicUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicsService {
    /**
     * @returns ApiResponseOfListOfTopicDto OK
     * @throws ApiError
     */
    public static getApiTopics(): CancelablePromise<ApiResponseOfListOfTopicDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Topics',
        });
    }
    /**
     * @returns ApiResponseOfTopicDto OK
     * @throws ApiError
     */
    public static postApiTopics({
        requestBody,
    }: {
        requestBody: TopicCreateRequest,
    }): CancelablePromise<ApiResponseOfTopicDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Topics',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponseOfTopicDto OK
     * @throws ApiError
     */
    public static getApiTopics1({
        id,
    }: {
        id: number,
    }): CancelablePromise<ApiResponseOfTopicDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Topics/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ApiResponseOfTopicDto OK
     * @throws ApiError
     */
    public static putApiTopics({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: TopicUpdateRequest,
    }): CancelablePromise<ApiResponseOfTopicDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Topics/{id}',
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
    public static deleteApiTopics({
        id,
    }: {
        id: number,
    }): CancelablePromise<ApiResponseOfObject> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Topics/{id}',
            path: {
                'id': id,
            },
        });
    }
}
