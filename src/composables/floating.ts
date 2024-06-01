import type { Component, StyleValue } from 'vue'
import { h } from 'vue'

export function createFloating(components: Component) {
  const metadata = reactive({
    props: {},
    attrs: {},
  })

  const proxyEl = ref<HTMLElement>()

  const container = defineComponent({
    setup() {
      // 使用 vueUse
      // const rect = reactive(useElementBounding(proxyEl))

      const rect = ref<DOMRect | undefined>()

      function update() {
        rect.value = proxyEl.value?.getBoundingClientRect()
      }

      useMutationObserver(proxyEl, update, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })

      useEventListener('resize', update)

      watch(proxyEl, () => update())

      const fixed: StyleValue = {
        transition: 'all 0.2s ease-in-out',
        position: 'fixed',
      }

      const style = computed<StyleValue>(() => {
        if (!rect.value || !proxyEl.value) {
          return {
            ...fixed,
            opacity: 0,
            pointerEvents: 'none',
          }
        }
        return {
          ...fixed,
          left: `${rect.value.left || 0}px`,
          top: `${rect.value.top || 0}px`,
        }
      })

      return () => h('div', { style: style.value }, h(components, { ...metadata.attrs, ...metadata.props }))
    },
  })

  const proxy = defineComponent({
    setup(props, ctx) {
      const el = ref<HTMLElement>()

      const attrs = useAttrs()

      metadata.props = props
      metadata.attrs = attrs

      onMounted(() => {
        proxyEl.value = el.value
      })

      onBeforeUnmount(() => {
        proxyEl.value = undefined
      })

      return () => h('div', { ref: el }, [
        ctx.slots.default ? h(ctx.slots.default) : null,
      ])
    },
  })

  return {
    container,
    proxy,
  }
}
