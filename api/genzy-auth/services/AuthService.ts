/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
    public static getAuthGoogleLogin({
        returnUrl = '/',
    }: {
        returnUrl?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/google-login',
            query: {
                'returnUrl': returnUrl,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getAuthGoogleCallback({
        returnUrl = '/',
    }: {
        returnUrl?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/google-callback',
            query: {
                'returnUrl': returnUrl,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getAuthMe(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/me',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postAuthRegister({
        requestBody,
    }: {
        requestBody: RegisterRequest,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postAuthLogin({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postAuthRefreshToken({
        requestBody,
    }: {
        requestBody: string,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthRevokeToken({
        requestBody,
    }: {
        requestBody: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/revoke-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthLogout({
        requestBody,
    }: {
        requestBody: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static postAuthExternalLogin({
        requestBody,
    }: {
        requestBody: ExternalLoginRequest,
    }): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/external-login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
