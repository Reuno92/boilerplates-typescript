import NavigationModel from '../abstract/navigation/navigation.model';

const NavigationRoutes: Array<NavigationModel> = new Array<NavigationModel>(
  {
    id: 1,
    name: 'Home',
    path: '/',
    title: 'Go to home page',
    onHeader: true,
    onFooter: false,
  },
  {
    id: 2,
    name: 'About',
    path: '/about',
    title: 'Go to about page',
    onHeader: true,
    onFooter: true,
  }
);

export default NavigationRoutes;
