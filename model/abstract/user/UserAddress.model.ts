import UserAddressGeo from './UserAdressGeo.model';

export default class UserAddressModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(public street: string, public suite: string, public city: string, public zipcode: string, public geo: UserAddressGeo) {}
}
