/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountDTOApiResponse } from '../models/AccountDTOApiResponse';
import type { AuthResponse } from '../models/AuthResponse';
import type { ExternalLoginRequest } from '../models/ExternalLoginRequest';
import type { LoginRequest } from '../models/LoginRequest';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getGoogleLogin({
        returnUrl = '/',
    }: {
        returnUrl?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/google-login',
            query: {
                'returnUrl': returnUrl,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getGoogleCallback({
        returnUrl = '/',
    }: {
        returnUrl?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/google-callback',
            query: {
                'returnUrl': returnUrl,
            },
        });
    }
    /**
     * @returns AccountDTOApiResponse OK
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<AccountDTOApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postRegister({
        requestBody,
    }: {
        requestBody?: RegisterRequest,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postLogin({
        requestBody,
    }: {
        requestBody?: LoginRequest,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postRefreshToken({
        requestBody,
    }: {
        requestBody?: string,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postRevokeToken({
        requestBody,
    }: {
        requestBody?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/revoke-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postLogout({
        requestBody,
    }: {
        requestBody?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postExternalLogin({
        requestBody,
    }: {
        requestBody?: ExternalLoginRequest,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/external-login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
