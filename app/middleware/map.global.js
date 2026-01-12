import {useAppStore} from "../../stores/appStore.js";

export default defineNuxtRouteMiddleware(async (to, from) => {

  const { meta, params, query } = to;
  const { config, countries, currencies, countryIso, currencyIso } = storeToRefs( useAppStore() );

  // const { $i18n, $direction } = useNuxtApp();
  // const locale = $i18n.locale.value;

  // server only for redirects
  if (process.server) {

    useHead({
      htmlAttrs: {
        // dir: computed( () => $direction() ),
      },
    });
    countryIso.value = getCountry()
    const { default: configs } = await import('~/assets/config.json');
    config.value = configs[countryIso.value] || configs['us'];
    console.log( 'Map.Global:', config.value )

  }
  return true;
})