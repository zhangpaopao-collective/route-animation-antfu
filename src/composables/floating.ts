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

      const fixed: StyleValue = {
        transition: 'all',
        transitionDuration: '1000ms',
        transitionTimingFunction: 'ease-in-out',
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

      const landed = ref(false)

      function liftOff() {
        landed.value = false
      }

      function land() {
        landed.value = true
      }

      watch(proxyEl, (el) => {
        liftOff()
        update()
        if (el) {
          setTimeout(() => {
            land()
          }, 2000)
        }
      })

      return () => {
        const children = h(components, metadata.attrs)

        return h('div', { style: style.value }, children)
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
