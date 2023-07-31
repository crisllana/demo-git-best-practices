module.exports = {
  publicPath: process.env.VUE_APP_PREVIEW_PATH || '/',
  runtimeCompiler: true,
  transpileDependencies: ['@empathyco/x-components', '@empathyco/x-utils'],
  css: {
    loaderOptions: {
      sass: {
        additionalData: (content, context) => {
          const USE_SASS_MATH = `@use 'sass:math';`;
          // The order of the imports are important because if not, color variables dont work properly
          const SASS_IMPORTS = `
            @import '@/assets/sass/_animations.scss';
            @import '@/assets/sass/_breakpoints.scss';
            @import '@/assets/sass/_colors.scss';
            @import '@/assets/sass/_fonts.scss';
            @import '@/assets/sass/_functions.scss';
            @import '@/assets/sass/_keen-ui.scss';
            @import '@/assets/sass/_mixins.scss';
            @import '@/assets/sass/_transitions.scss';
            @import '@/assets/sass/_variables.scss';
          `;
          const { resourcePath } = context;
          if (resourcePath.includes('node_modules/keen-ui') && content.includes(USE_SASS_MATH)) {
            return content.replace(
              USE_SASS_MATH,
              `
                ${USE_SASS_MATH}
                ${SASS_IMPORTS} 
              `
            );
          }
          return `
            ${USE_SASS_MATH}
            ${SASS_IMPORTS} 
            ${content}
          `;
        }
      }
    }
  }
};
