import RickMortyPaginationModel from './RickMortyPagination.model';

export class RickMortyResponseModel<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(public info: RickMortyPaginationModel, public results: Array<T>) {}
}
