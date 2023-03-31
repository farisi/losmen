import type { Route } from '@vaadin/router';
import Role from './generated/net/myapp/application/data/Role';
import { appStore } from './stores/app-store';
import './views/helloworld/hello-world-view';
import './views/main-layout';
import './views/list/list-view';
import './views/room/room-index'

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};


const emptyViewRoute: ViewRoute[]=[];

const adminView: ViewRoute[] = [
  {
    path: 'contact',
    component: 'list-view',
    requiresLogin: true,
    icon: 'globe-solid',
    title: 'Contact',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/about/about-view');
      return;
    },
  },
  {
    path: 'room',
    component: 'room-index',
    requiresLogin: true,
    icon: 'folder',
    title: 'Kamar',
    children: emptyViewRoute,
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/about/about-view');
      return;
    },
  },
];

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path:'Master',
    title:'Master',
    requiresLogin: true,
    children: adminView,
    icon: 'folder-open',
  },
  {
    path: 'hello',
    component: 'hello-world-view',
    requiresLogin: true,
    icon: 'globe-solid',
    title: 'Hello World',
    children: emptyViewRoute,
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'about',
    component: 'about-view',
    requiresLogin: true,
    icon: 'file',
    title: 'About',
    children:emptyViewRoute,
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/about/about-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
    requiresLogin: true,
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },

  {
    path: '',
    component: 'main-layout',
    children: views,
  },
];
