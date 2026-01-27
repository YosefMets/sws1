Array.prototype.removeElement = function (element) {
  const pos = this.indexOf(element);
  if (pos !== -1) {
    this.splice(pos, 1)
  }
  return this
}

export const useAppStore = defineStore('app', () => {
  const config = ref(null);
  const countries = ref(null);
  const currencies = ref(null);
  const countryIso = ref(null);
  const currencyIso = ref(null);
  const scrollY = ref(0);

  const sizes = ref([
    { name: 'm', eu: '41-42', us: '8-9', uk: '7-8', priceId: 'price_1Sc4OIHyfA30IheYhxuHB3d1' },
    { name: 'l', eu: '43-44', us: '9½-10½', uk: '8½-9½', priceId: 'price_1StQimHyfA30IheYO9gmxOuc' },
    { name: 'xl', eu: '45-46', us: '11-12', uk: '10-11', priceId: 'price_1Sc4OIHyfA30IheYhxuHB3d1' },
  ]);

  const user = ref({
    fname: '',
    lname: '',
    email: '',
    size: '',
    shipping: {
      address: '',
      address2: '',
      state: '',
      zip: '',
      city: '',
      country: '',
    },
    payment: {
      token: '',
      brand: '',
      exp_month: null,
      exp_year: null,
      last4: '',
    },
    news: true,
  });

  const country = computed( () => countries.value?.[countryIso.value]);
  const currency = computed( () => config.value?.currency  );

  return {
    config,
    countries, currencies,
    countryIso, currencyIso,
    user,
    sizes,
    scrollY,
    country, currency,
  }
});