export function useEventListener(target, event, callback, options) {
  onMounted(() => target.addEventListener(event, callback, options))
  onUnmounted(() => target.removeEventListener(event, callback, options))
}