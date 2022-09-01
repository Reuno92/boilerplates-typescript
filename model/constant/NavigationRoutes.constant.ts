import NavigationModel from '../abstract/navigation/navigation.model';

const NavigationRoutes: Array<NavigationModel> = new Array<NavigationModel>(
  {
    id: 1,
    name: 'Home',
    path: '/',
    title: 'Home Page',
    onHeader: true,
    onFooter: false,
  },
  {
    id: 2,
    name: 'About',
    path: '/about',
    title: 'About Page',
    onHeader: true,
    onFooter: true,
  }
);

export default NavigationRoutes;
