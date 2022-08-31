import UserAddressModel from './UserAddress.model';

export default class UserModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(public id: number, public username: string, public name: string, public email: string, public address: UserAddressModel, public phone: string, public website: string) {}
}
