import * as fs from 'fs';
import { join } from 'path';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import LoggerResponse from '../model/abstract/LoggerResponse';

export default class CallApi {
  private headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
  };

  private Instance: AxiosInstance = Axios.create({
    baseURL: this.baseURI,
    timeout: 3000,
    headers: {
      ...this.headers,
    },
  });

  constructor(public baseURI: string) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(join(__dirname, '../log'))) {
      // eslint-disable-next-line consistent-return,security/detect-non-literal-fs-filename
      fs.mkdir(join(__dirname, '../log'), (err: NodeJS.ErrnoException | null): Error | void => {
        if (err) {
          return new Error("Don't create log folder", { cause: err });
        }
      });
    }
  }

  public get<R>(uri: string, headers?: AxiosRequestHeaders): Promise<R | void> {
    const DATE = new Date();
    const REAL_DATE_MINIFY = DATE?.toLocaleDateString('en-GB').split('/').reverse().join('');
    const TIME = DATE?.toLocaleTimeString('en-GB').split(':').join('');
    let logger: LoggerResponse;

    return this.Instance.get(uri, { headers } as AxiosRequestConfig)
      .then((response: AxiosResponse<R, unknown>) => {
        logger = new LoggerResponse('success', 'Nothing To Signal', response?.headers, response?.data);
        return response?.data;
      })
      .catch((err: AxiosError) => {
        logger = new LoggerResponse('error', err?.response?.statusText ?? 'Anything going wrong, Captain Obvious. We perceive not to know what happened', err?.response?.headers, err?.response?.data);
        throw new Error('Error, during call API', { cause: err });
      })
      .finally(() => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs?.writeFileSync(
          join(__dirname, `../log/${REAL_DATE_MINIFY}-${TIME}.json`),
          JSON.stringify(
            {
              request: {
                baseURL: this.baseURI,
                path: uri,
                protocol: 'https',
                headers: this.headers,
              },
              response: logger ? { ...logger } : null,
            },
            null,
            2
          )
        );
      });
  }

  public post<B, R>(uri: string, body: B, headers?: AxiosRequestHeaders): Promise<R | void> {
    const DATE = new Date();
    const REAL_DATE_MINIFY = DATE?.toLocaleDateString('en-GB').split('/').reverse().join('');
    const TIME = DATE?.toLocaleTimeString('en-GB').split(':').join('');
    let logger: LoggerResponse;

    return this.Instance.post('', body, {
      headers,
    } as AxiosRequestConfig)
      .then((response: AxiosResponse<R, unknown>) => {
        logger = new LoggerResponse('success', 'Nothing To Signal', response?.headers, response?.data);
        return response.data;
      })
      .catch((error: AxiosError) => {
        logger = new LoggerResponse(
          'error',
          error?.response?.statusText ?? 'Anything going wrong, Captain Obvious. We perceive not to know what happened',
          error?.response?.headers,
          error?.response?.data
        );
      })
      .finally(() => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.writeFileSync(
          join(__dirname, `../log/${REAL_DATE_MINIFY}-${TIME}.json`),
          JSON.stringify(
            {
              request: {
                baseURL: this.baseURI,
                path: uri,
                protocol: 'https',
                body,
                headers: this.headers,
              },
              response: logger ? { ...logger } : null,
            },
            null,
            2
          )
        );
      });
  }
}
