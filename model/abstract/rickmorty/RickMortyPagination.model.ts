export default class RickMortyPaginationModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(public count: number, public pages: number, public next: number | null, public prev: number | null) {}
}
