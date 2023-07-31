<template>
  <div class="app">
    <input style="display: none" />
    <input type="password" style="display: none" aria-label="hidden" />
    <transition name="app__content--animated" mode="out-in" appear>
      <router-view @login="onLogin" class="app__content" />
    </transition>
    <span v-if="isVersionVisible" class="app__text app__text--version">v{{ $epb.version }}</span>
  </div>
</template>

<script lang="ts">
  import { APP_CONSTS, AUTH_CONSTS, CONTAINER, ROUTER_CONSTS } from 'playboard-core';
  import { mapActions, mapGetters } from 'playboard-core/composables';
  import { TYPES } from 'playboard-core/config/inversify.types';
  import { computed, defineComponent, getCurrentInstance, watch } from 'vue';

  export default defineComponent({
    name: 'App',
    provide: function (): Record<string, any> {
      return {
        [TYPES.ObjectIdService]: CONTAINER.get(TYPES.ObjectIdService)
      };
    },
    setup: function () {
      const ctx = getCurrentInstance();
      if (!ctx) {
        throw new Error("'ctx' is not defined");
      }

      const { isLoggedIn } = mapGetters<boolean>(ctx.proxy.$store, AUTH_CONSTS.moduleName, {
        isLoggedIn: AUTH_CONSTS.getters.isLoggedIn
      });

      const { alreadyLoggedInOnce } = mapGetters<boolean>(ctx.proxy.$store, APP_CONSTS.moduleName, {
        alreadyLoggedInOnce: APP_CONSTS.getters.alreadyLoggedInOnce
      });

      const isVersionVisible = computed<boolean>(
        () =>
          ctx.proxy.$route.name === ROUTER_CONSTS.routes.login ||
          ctx.proxy.$route.name === ROUTER_CONSTS.routes.home
      );

      const { setAlreadyLoggedInOnce } = mapActions(ctx.proxy.$store, APP_CONSTS.moduleName, {
        setAlreadyLoggedInOnce: APP_CONSTS.actions.setAlreadyLoggedInOnce
      });

      function onLogin(success: boolean): void {
        if (success) {
          ctx.proxy.$router.replace({
            ...ctx.proxy.$route,
            name: ROUTER_CONSTS.routes.home
          });
        }
      }

      watch(
        isLoggedIn,
        async value => {
          // With this we disable the first login dialog until we change it to welcome new users,
          // no matter which project it is
          if (value && !alreadyLoggedInOnce.value) {
            await setAlreadyLoggedInOnce(true);
          }
        },
        { immediate: true }
      );

      return {
        isVersionVisible,
        onLogin
      };
    }
  });
</script>

<style lang="scss">
  @import 'assets/sass/reset';
  @import 'assets/sass/resources';
  @import 'assets/sass/default';
  @import 'assets/sass/scroll';
  @import 'assets/sass/styles';

  html,
  body,
  .app,
  .app__content {
    height: 100%;
  }

  body {
    overflow: hidden;
  }

  .app {
    &__content {
      &--animated {
        @include animation--fade-out-in;
      }
    }

    &__text {
      &--version {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: rem(2px);
        color: $color--grey;
        font-size: $font-size--tiny;
      }
    }
  }
</style>
