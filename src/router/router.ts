import { DomainEnum } from '@empathybroker/tsclient-play/dist/enums/domain.enum';

import {
  ACCOUNT_ROUTES,
  AUDIT_ROUTES,
  BEACON_NEXT_QUERIES_ROUTES,
  BEACON_RELATED_TAGS_ROUTES,
  BLACKLIST_ROUTES,
  CONFIGURATIONS_ROUTES,
  Domain,
  EXPLAIN_ROUTES,
  FeatureIdEnum,
  GUARDS_EXECUTOR,
  HIGHLIGHTS_ROUTES,
  Home,
  INDEX_ROUTES,
  INSIGHTS_ROUTES,
  INSTANCE_MANAGEMENT_ROUTES,
  LoginGuard,
  LogoutGuard,
  NavigationLanding,
  PageNotFound,
  PHANTOM_ROUTE,
  PlatformLogin,
  PRIVACY_ROUTES,
  PROMOTIONS_ROUTES,
  REDIRECTIONS_ROUTES,
  Root,
  ROUTER_CONSTS,
  SEARCH_EQUALIZE_ROUTES,
  SYNONYMS_ROUTES
} from 'playboard-core';

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getRouter(environment: string): Router {
  return new Router({
    base: process.env.VUE_APP_PREVIEW_PATH,
    mode: process.env.VUE_APP_PREVIEW_PATH ? 'hash' : 'history',
    routes: [
      {
        name: ROUTER_CONSTS.routes.login,
        path: '/login',
        component: PlatformLogin,
        beforeEnter: GUARDS_EXECUTOR([LoginGuard.execute])
      },
      {
        name: ROUTER_CONSTS.routes.logout,
        path: '/logout',
        beforeEnter: GUARDS_EXECUTOR([LogoutGuard.execute])
      },
      {
        name: ROUTER_CONSTS.routes.root,
        path: '/',
        component: Root,
        children: [
          ...INDEX_ROUTES,
          ...ACCOUNT_ROUTES,
          {
            name: ROUTER_CONSTS.routes.home,
            path: `/:${ROUTER_CONSTS.params.instanceId}?`,
            component: Home,
            // FYI: route guards moved to component
            children: [
              ...HIGHLIGHTS_ROUTES,
              ...AUDIT_ROUTES,
              ...INSTANCE_MANAGEMENT_ROUTES,
              ...PRIVACY_ROUTES,
              PHANTOM_ROUTE,
              {
                name: ROUTER_CONSTS.routes[DomainEnum.SEARCH],
                path: DomainEnum.SEARCH,
                component: Domain,
                meta: {
                  domain: DomainEnum.SEARCH
                },
                children: [
                  ...INSIGHTS_ROUTES[DomainEnum.SEARCH],
                  {
                    name: ROUTER_CONSTS.routes.play[DomainEnum.SEARCH],
                    path: FeatureIdEnum.PLAY,
                    component: NavigationLanding,
                    meta: {
                      featureId: FeatureIdEnum.PLAY
                    },
                    children: [
                      ...SEARCH_EQUALIZE_ROUTES,
                      ...SYNONYMS_ROUTES,
                      ...BLACKLIST_ROUTES,
                      ...PROMOTIONS_ROUTES,
                      ...REDIRECTIONS_ROUTES,
                      ...CONFIGURATIONS_ROUTES[DomainEnum.SEARCH],
                      ...BEACON_RELATED_TAGS_ROUTES,
                      ...BEACON_NEXT_QUERIES_ROUTES
                    ]
                  },
                  ...EXPLAIN_ROUTES
                ]
              },
              {
                name: ROUTER_CONSTS.routes[DomainEnum.BROWSE],
                path: DomainEnum.BROWSE,
                component: Domain,
                meta: {
                  domain: DomainEnum.BROWSE
                },
                children: [
                  ...INSIGHTS_ROUTES[DomainEnum.BROWSE],
                  {
                    name: ROUTER_CONSTS.routes.play[DomainEnum.BROWSE],
                    path: FeatureIdEnum.PLAY,
                    component: NavigationLanding,
                    meta: {
                      featureId: FeatureIdEnum.PLAY
                    },
                    children: [...CONFIGURATIONS_ROUTES[DomainEnum.BROWSE]]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: ROUTER_CONSTS.routes.pageNotFound,
        path: '*',
        component: PageNotFound
      }
    ]
  });
}
