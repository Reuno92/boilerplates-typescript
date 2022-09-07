import { AxiosResponseHeaders } from 'axios';

export default class LoggerResponseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(public status: 'error' | 'success', public message: string, public headers: AxiosResponseHeaders | undefined, public data: unknown) {}
}
