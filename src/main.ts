import 'reflect-metadata';

import { DomainEnum } from '@empathybroker/tsclient-play/dist/enums/domain.enum';
import {
  APP_MESSAGES,
  AUDIT_MESSAGES,
  AUTH_MESSAGES,
  BROWSE_ANALYTICS_MESSAGES,
  Config,
  CONTAINER,
  CRUD_MESSAGES,
  Dictionary,
  ERRORS_MESSAGES,
  EXPLAIN_MESSAGES,
  FeatureIdEnum,
  FeaturesConfig,
  FILTERS_MESSAGES,
  HIGHLIGHTS_MESSAGES,
  INSIGHTS_MESSAGES,
  INSTANCE_MANAGEMENT_MESSAGES,
  LocaleEnum,
  ROUTER_CONSTS,
  TOOLS_MESSAGES,
  useX,
  YEARLY_SUMMARY_MESSAGES
} from 'playboard-core';
import { TYPES } from 'playboard-core/config/inversify.types';
import { initApp, initServices, initWorker } from 'playboard-core/utils/init';
import Vue from 'vue';
import { Store } from 'vuex';
import { version } from '../package.json';
import App from './app.vue';
import { getRouter } from './router/router';
import { STORE } from './store/store';

(async () => {
  const previewPath = (process.env.VUE_APP_PREVIEW_PATH as string) || '';
  const configFile = await fetch(`${previewPath}/config.json?version=${version}`);
  const config = (await configFile.json()) as Config;

  CONTAINER.rebind<Dictionary<Dictionary>>(TYPES.Messages).toConstantValue({
    [LocaleEnum.ENGLISH]: {
      ...AUTH_MESSAGES[LocaleEnum.ENGLISH],
      ...FILTERS_MESSAGES[LocaleEnum.ENGLISH],
      ...YEARLY_SUMMARY_MESSAGES[LocaleEnum.ENGLISH],
      ...HIGHLIGHTS_MESSAGES[LocaleEnum.ENGLISH],
      ...BROWSE_ANALYTICS_MESSAGES[LocaleEnum.ENGLISH],
      ...INSIGHTS_MESSAGES[LocaleEnum.ENGLISH],
      ...CRUD_MESSAGES[LocaleEnum.ENGLISH],
      ...TOOLS_MESSAGES[LocaleEnum.ENGLISH],
      ...ERRORS_MESSAGES[LocaleEnum.ENGLISH],
      ...EXPLAIN_MESSAGES[LocaleEnum.ENGLISH],
      ...AUDIT_MESSAGES[LocaleEnum.ENGLISH],
      ...INSTANCE_MANAGEMENT_MESSAGES[LocaleEnum.ENGLISH],
      ...APP_MESSAGES[LocaleEnum.ENGLISH]
    },
    [LocaleEnum.SPANISH]: {
      ...AUTH_MESSAGES[LocaleEnum.SPANISH],
      ...FILTERS_MESSAGES[LocaleEnum.SPANISH],
      ...YEARLY_SUMMARY_MESSAGES[LocaleEnum.SPANISH],
      ...HIGHLIGHTS_MESSAGES[LocaleEnum.SPANISH],
      ...BROWSE_ANALYTICS_MESSAGES[LocaleEnum.SPANISH],
      ...INSIGHTS_MESSAGES[LocaleEnum.SPANISH],
      ...CRUD_MESSAGES[LocaleEnum.SPANISH],
      ...TOOLS_MESSAGES[LocaleEnum.SPANISH],
      ...ERRORS_MESSAGES[LocaleEnum.SPANISH],
      ...EXPLAIN_MESSAGES[LocaleEnum.SPANISH],
      ...AUDIT_MESSAGES[LocaleEnum.SPANISH],
      ...INSTANCE_MANAGEMENT_MESSAGES[LocaleEnum.SPANISH],
      ...APP_MESSAGES[LocaleEnum.SPANISH]
    }
  });

  CONTAINER.rebind<Store<any>>(TYPES.Store).toConstantValue(STORE);

  CONTAINER.rebind<FeaturesConfig>(TYPES.FeaturesConfig).toConstantValue({
    [DomainEnum.SEARCH]: [
      {
        id: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.insights[DomainEnum.SEARCH]
      },
      {
        id: FeatureIdEnum.OVERALL,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.overall[DomainEnum.SEARCH]
      },
      {
        id: FeatureIdEnum.QUERIES,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.queries
      },
      {
        id: FeatureIdEnum.NOW,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.now
      },
      {
        id: FeatureIdEnum.ORIGINS,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.origins
      },
      {
        id: FeatureIdEnum.KEYWORDS,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.keywords
      },
      {
        id: FeatureIdEnum.CATEGORIES,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.categories
      },
      {
        id: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.play[DomainEnum.SEARCH]
      },
      {
        id: FeatureIdEnum.EQUALIZE,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.equalize.list
      },
      {
        id: FeatureIdEnum.SYNONYM,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.synonyms.list
      },
      {
        id: FeatureIdEnum.BLACKLIST,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.blacklist.list
      },
      {
        id: FeatureIdEnum.PROMOTION,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.promotions.list
      },
      {
        id: FeatureIdEnum.REDIRECTION,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.redirections.list
      },
      {
        id: FeatureIdEnum.CONFIGURATION,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.configurations[DomainEnum.SEARCH].list
      },
      {
        id: FeatureIdEnum.RELATED_TAGS,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.relatedTags.list
      },
      {
        id: FeatureIdEnum.NEXT_QUERIES,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.nextQueries.list
      },
      {
        id: FeatureIdEnum.EXPLAIN,
        routeName: ROUTER_CONSTS.routes.explain.landing
      }
    ],
    [DomainEnum.BROWSE]: [
      {
        id: FeatureIdEnum.INSIGHTS
      },
      {
        id: FeatureIdEnum.OVERALL,
        parentId: FeatureIdEnum.INSIGHTS,
        routeName: ROUTER_CONSTS.routes.overall[DomainEnum.BROWSE]
      },
      {
        id: FeatureIdEnum.PLAY
      },
      {
        id: FeatureIdEnum.CONFIGURATION,
        parentId: FeatureIdEnum.PLAY,
        routeName: ROUTER_CONSTS.routes.configurations[DomainEnum.BROWSE].attributes
      }
    ],
    [DomainEnum.GLOBAL]: [
      {
        id: FeatureIdEnum.HIGHLIGHTS,
        routeName: ROUTER_CONSTS.routes.highlights
      },
      {
        id: FeatureIdEnum.AUDIT,
        routeName: ROUTER_CONSTS.routes.audit
      },
      {
        id: FeatureIdEnum.INSTANCE_MANAGEMENT,
        routeName: ROUTER_CONSTS.routes.instanceManagement.root,
        menuConfig: {
          displayOnHeader: true
        }
      },
      {
        id: FeatureIdEnum.ACCOUNT,
        routeName: ROUTER_CONSTS.routes.account,
        menuConfig: {
          hidden: true
        }
      },
      {
        id: FeatureIdEnum.PRIVACY,
        routeName: ROUTER_CONSTS.routes.privacy,
        menuConfig: {
          hidden: true
        }
      }
    ]
  });

  initServices(config.services);
  initApp({
    version,
    environment: config.environment,
    customization: config.customization,
    userStaticsUrl: config.userStaticsUrl,
    loginWithEmail: true,
    instanceManagementIndexVisible: true
  });
  initWorker();

  useX({
    store: STORE,
    endpoints: {
      search: `${config.services.play.url}/{extraParams.instanceId}/search/api/query`
    }
  });

  new Vue({
    store: STORE,
    router: getRouter(config.environment),
    render: h => h(App)
  }).$mount('#app');
})();
