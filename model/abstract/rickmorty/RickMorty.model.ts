export default class RickMortyModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public name: string,
    public image: string,
    public gender: string,
    public species: string,
    public origin: {
      dimension: string;
      name: string;
    },
    public status: string,
    public type: string
  ) {}
}
