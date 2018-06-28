import LandingView from './LandingView/LandingView';
import { DemoRoute } from './DemoPage';

const routes = [
  {
    path: '/',
    exact: true,
    component: LandingView
  },
  DemoRoute
];

export default routes;
