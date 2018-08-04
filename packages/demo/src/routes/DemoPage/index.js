import DemoView from './DemoView';
import { demoRoutes } from './routes';

export const DemoRoute = {
  path: '/demo',
  component: DemoView,
  routes: demoRoutes
};
