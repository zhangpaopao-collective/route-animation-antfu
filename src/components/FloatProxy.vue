<script setup lang="ts">
import { metadata, proxyEl } from '~/composables/floating'

const props = defineProps<{}>()

const el = ref<HTMLElement>()

const attrs = useAttrs()

metadata.props = props
metadata.attrs = attrs

onMounted(() => {
  proxyEl.value = el.value
})
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>
