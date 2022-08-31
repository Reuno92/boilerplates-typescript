import RickMortyPagination from './RickMortyPagination';

export class RickMortyResponseModel<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(public info: RickMortyPagination, public results: Array<T>) {}
}
