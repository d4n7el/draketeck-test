import Home from '../views/home';
import TaskView from '../views/Task';

export const routesPrivate = [
  {
    path: '/login',
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/tasks',
    component: TaskView,
  },
  {
    path: '/',
    component: Home,
  },
];
