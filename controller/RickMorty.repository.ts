// eslint-disable-next-line import/no-named-as-default
import { AxiosRequestHeaders } from 'axios';
import CallApi from '../tool/CallApi';

export default class RickMortyRepository {
  private readonly baseURI: string = 'https://rickandmortyapi.com/graphql';

  private api: CallApi;

  constructor() {
    this.api = new CallApi(this.baseURI);
  }

  public getList(page: number = 1): Promise<Response | void> {
    const QUERY = `query Data($page: Int) {
  characters(page: $page) {
    info {
      count
      next
      pages
      prev
    }
    results {
      name
      image
      gender
      species
      origin {
        dimension
        name
      }
      status
      type
    }
  }
}`;

    const VARIABLES = {
      page,
    };

    const BODY = {
      query: QUERY,
      variables: VARIABLES,
    };

    return this.api?.post('', JSON.stringify(BODY), {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DNT: 1,
      Origin: this.baseURI,
    } as AxiosRequestHeaders);
  }
}
