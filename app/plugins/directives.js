export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('clickout', {
    mounted(el, binding) {
      el._clickOutside = event => {
        if (!el.contains(event.target)) binding.value()
      }
      document.addEventListener('click', el._clickOutside)
    },
    unmounted(el) {
      document.removeEventListener('click', el._clickOutside)
    }
  })
})