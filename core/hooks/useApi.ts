import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { notification } from 'antd';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BASE_URLS } from '../constants/urls';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse {
  detail?: string;
}

interface AxiosErrorWithData extends AxiosError {
  response?: AxiosResponse<ApiResponse>;
}

interface UseApiOptions {
  fetchOnLoad?: boolean;
  requestTransformer?: (requestData: any) => any;
  responseTransformer?: (responseData: any) => any;
  baseURLType?: keyof typeof BASE_URLS;
  headers?: Record<string, string>;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  callApi: (
    payload?: any,
    params?: Record<string, any>,
    dynamicPath?: string,
  ) => Promise<T | void>;
  reFetch: () => void;
}

const applyTransformer = (data: any, transformer?: (data: any) => any) => {
  return transformer ? transformer(data) : data;
};

const useApi = <T = any>(
  baseEndpoint: string,
  method: HttpMethod = 'GET',
  options: UseApiOptions = { fetchOnLoad: false },
): UseApiReturn<T> => {
  const {
    fetchOnLoad,
    requestTransformer,
    responseTransformer,
    baseURLType,
    headers = {},
  } = options;
  const baseURL = BASE_URLS[baseURLType || 'BASE'];
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const callApi = useCallback(
    async (
      payload: any = null,
      params: Record<string, any> = {},
      dynamicPath: string = '',
      headers: Record<string, string> = {},
    ): Promise<T | void> => {
      setLoading(true);
      setError(null);

      try {
        const finalEndpoint = `${baseEndpoint}${dynamicPath}`;
        const transformedPayload = applyTransformer(
          payload,
          requestTransformer,
        );

        const config: AxiosRequestConfig = {
          params,
          baseURL,
          headers: {
            ...headers,
          },
        };

        let response: AxiosResponse<T>;

        switch (method.toUpperCase()) {
          case 'GET':
            response = await axiosInstance.get<T>(finalEndpoint, config);
            break;
          case 'POST':
            response = await axiosInstance.post<T>(
              finalEndpoint,
              transformedPayload,
              config,
            );
            break;
          case 'PUT':
            response = await axiosInstance.put<T>(
              finalEndpoint,
              transformedPayload,
              config,
            );
            break;
          case 'DELETE':
            response = await axiosInstance.delete<T>(finalEndpoint, config);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        const transformedResponse = applyTransformer(
          response.data,
          responseTransformer,
        );
        setData(transformedResponse);
        return transformedResponse;
      } catch (error) {
        const axiosError = error as AxiosErrorWithData;
        notification.error({
          message: 'Error',
          description:
            (axiosError.response?.data as { detail?: string })?.detail ||
            'Something went wrong!',
        });
        setError(axiosError);
        console.error(`API Error: ${axiosError.message}`, axiosError);
      } finally {
        setLoading(false);
      }
    },
    [
      baseEndpoint,
      method,
      requestTransformer,
      responseTransformer,
      baseURL,
      headers,
    ],
  );

  const reFetch = useCallback(() => {
    callApi();
  }, [callApi]);

  useEffect(() => {
    if (fetchOnLoad) {
      callApi();
    }
  }, [fetchOnLoad]);

  return { data, loading, error, callApi, reFetch };
};

export default useApi;
