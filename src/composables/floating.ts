import type { Component, StyleValue } from 'vue'
import { Teleport, h } from 'vue'

export function createFloating(components: Component) {
  const metadata = reactive({
    attrs: {},
  })

  const proxyEl = ref<HTMLElement>()

  const container = defineComponent({
    setup() {
      // 使用 vueUse
      const rect = ref(useElementBounding(proxyEl))

      const fixed: StyleValue = {
        transition: 'all',
        transitionDuration: '500ms',
        transitionTimingFunction: 'ease-in-out',
        position: 'fixed',
      }

      const style = computed<StyleValue>(() => {
        if (!rect.value || !proxyEl.value) {
          return {
            position: 'fixed',
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

      const landed = ref(false)
      let lifting: any
      function liftOff() {
        landed.value = false
      }

      function land() {
        lifting = setTimeout(() => {
          landed.value = true
        }, 600)
      }

      watch(proxyEl, (el, prev) => {
        clearTimeout(lifting)

        // change, start lift
        if (prev)
          liftOff()

        // waiting land
        if (el)
          land()
      })

      return () => {
        const children = h(components, metadata.attrs)
        return h('div', { style: style.value }, [children])
      }
    },
  })

  const proxy = defineComponent({
    setup(_, ctx) {
      const el = ref<HTMLElement>()

      const attrs = useAttrs()

      metadata.attrs = attrs

      onMounted(() => {
        proxyEl.value = el.value
      })

      onUnmounted(() => {
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
