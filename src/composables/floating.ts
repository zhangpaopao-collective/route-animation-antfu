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
      const rect = reactive(useElementBounding(proxyEl))

      const fixed: StyleValue = {
        transition: 'all 0.2s ease-in-out',
        position: 'fixed',
      }

      const style = computed<StyleValue>(() => {
        if (!proxyEl.value) {
          return {
            ...fixed,
            opacity: 0,
            pointerEvents: 'none',
          }
        }
        return {
          ...fixed,
          left: `${rect.left || 0}px`,
          top: `${rect.top || 0}px`,
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
