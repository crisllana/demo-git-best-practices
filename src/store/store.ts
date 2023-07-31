import {
  ANALYTICS_CONSTS,
  ANALYTICS_MODULE,
  APP_CONSTS,
  APP_MODULE,
  AUDIT_CONSTS,
  AUDIT_MODULE,
  AUTH_CONSTS,
  AUTH_MODULE,
  COMMON_CONSTS,
  CONFIG_CONSTS,
  CONFIG_MODULE,
  CONTEXT_CONSTS,
  CONTEXT_MODULE,
  CRUD_CONSTS,
  CRUD_MODULE,
  HIGHLIGHTS_CONSTS,
  HIGHLIGHTS_MODULE,
  INDEX_CONSTS,
  INDEX_MODULE,
  INSTANCE_MANAGEMENT_CONSTS,
  INSTANCE_MANAGEMENT_MODULE,
  MEDIA_CONSTS,
  MEDIA_MODULE,
  MESSAGES_CONSTS,
  MESSAGES_MODULE,
  SEARCH_CONSTS,
  SEARCH_MODULE,
  SetCurrentInstanceAction,
  TAGGING_CONSTS,
  TAGGING_MODULE,
  TOOLING_CONSTS,
  TOOLING_MODULE,
  USER_CONSTS,
  USER_MODULE,
  YEARLY_SUMMARY_CONSTS,
  YEARLY_SUMMARY_MODULE
} from 'playboard-core';

import { Store } from 'vuex';

export const STORE = new Store({
  modules: {
    [MEDIA_CONSTS.moduleName]: MEDIA_MODULE,
    [MESSAGES_CONSTS.moduleName]: MESSAGES_MODULE,
    [AUTH_CONSTS.moduleName]: AUTH_MODULE,
    [CONFIG_CONSTS.moduleName]: CONFIG_MODULE,
    [CONTEXT_CONSTS.moduleName]: CONTEXT_MODULE,
    [ANALYTICS_CONSTS.moduleName]: ANALYTICS_MODULE,
    [CRUD_CONSTS.moduleName]: CRUD_MODULE,
    [TOOLING_CONSTS.moduleName]: TOOLING_MODULE,
    [SEARCH_CONSTS.moduleName]: SEARCH_MODULE,
    [INDEX_CONSTS.moduleName]: INDEX_MODULE,
    [AUDIT_CONSTS.moduleName]: AUDIT_MODULE,
    [USER_CONSTS.moduleName]: USER_MODULE,
    [INSTANCE_MANAGEMENT_CONSTS.moduleName]: INSTANCE_MANAGEMENT_MODULE,
    [TAGGING_CONSTS.moduleName]: TAGGING_MODULE,
    [APP_CONSTS.moduleName]: APP_MODULE,
    [HIGHLIGHTS_CONSTS.moduleName]: HIGHLIGHTS_MODULE,
    [YEARLY_SUMMARY_CONSTS.moduleName]: YEARLY_SUMMARY_MODULE
  },
  actions: {
    [COMMON_CONSTS.actions.setCurrentInstance]: SetCurrentInstanceAction.execute
  }
});