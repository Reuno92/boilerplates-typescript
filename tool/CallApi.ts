import * as fs from 'fs';
import { join } from 'path';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import LoggerResponseModel from '../model/abstract/LoggerResponse.model';

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

  private logger: LoggerResponseModel | null | undefined;

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
    const { date, time } = this.getTime();

    return this.Instance.get(uri, { headers } as AxiosRequestConfig)
      .then((response: AxiosResponse<R, unknown>) => {
        this.logger = this.setSuccess<R>(response);
        return response?.data;
      })
      .catch((err: AxiosError) => {
        this.logger = this.setError(err);
        throw new Error('Error, during call API', { cause: err });
      })
      .finally(() => {
        this.logs(uri, { date, time }, this.headers, this.logger);
      });
  }

  public post<B, R>(uri: string, body: B, headers?: AxiosRequestHeaders): Promise<R | void> {
    const { date, time } = this.getTime();

    return this.Instance.post(uri, body, {
      headers,
    } as AxiosRequestConfig)
      .then((response: AxiosResponse<R, unknown>) => {
        this.logger = this.setSuccess<R>(response);
        return response.data;
      })
      .catch((error: AxiosError) => {
        this.logger = this.setError(error);
        throw new Error('Error, during call API', { cause: error });
      })
      .finally(() => {
        this.logsWithBody<B>(uri, { date, time }, this.headers, body, this.logger);
      });
  }

  private setSuccess<R>(response: AxiosResponse<R, unknown>): LoggerResponseModel {
    return new LoggerResponseModel('success', 'Nothing To Signal', response?.headers, response?.data);
  }

  private setError(error: AxiosError): LoggerResponseModel {
    return new LoggerResponseModel(
      'error',
      error?.response?.statusText ?? 'Anything going wrong, Captain Obvious. We perceive not to know what happened',
      error?.response?.headers,
      error?.response?.data
    );
  }

  private getTime(): { date: string; time: string } {
    const DATE = new Date();
    const REAL_DATE_MINIFY = DATE?.toLocaleDateString('en-GB').split('/').reverse().join('');
    const TIME_MINIFY = DATE?.toLocaleTimeString('en-GB').split(':').join('');

    return {
      date: REAL_DATE_MINIFY,
      time: TIME_MINIFY,
    };
  }

  private logs(uri: string, timeSnapshot: { date: string; time: string }, headers: AxiosRequestHeaders, loggerResponse?: LoggerResponseModel | null): void {
    const { date, time } = timeSnapshot;
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(
      join(__dirname, `../log/${date}-${time}.json`),
      JSON.stringify(
        {
          request: {
            baseURL: uri,
            protocol: 'https',
            headers,
          },
          response: loggerResponse ? { ...loggerResponse } : null,
        },
        null,
        2
      )
    );
  }

  private logsWithBody<B>(uri: string, timeSnapshot: { date: string; time: string }, headers: AxiosRequestHeaders, body?: B, loggerResponse?: LoggerResponseModel | null): void {
    const { date, time } = timeSnapshot;
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(
      join(__dirname, `../log/${date}-${time}.json`),
      JSON.stringify(
        {
          request: {
            baseURL: uri,
            protocol: 'https',
            body,
            headers,
          },
          response: loggerResponse ? { ...loggerResponse } : null,
        },
        null,
        2
      )
    );
  }
}
