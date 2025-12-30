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
    { name: 'M', eu: '41-42', us: '8-9', uk: '7-8' },
    { name: 'L', eu: '43-44', us: '9½-10½', uk: '8½-9½' },
    { name: 'XL', eu: '45-46', us: '11-12', uk: '10-11' },
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
  const currency = computed( () => currencies.value?.[currencyIso.value]);

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