export default class NavigationModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(public id: number, public name: string, public path: string, public title: string, public onHeader: boolean, public onFooter: boolean) {}
}
